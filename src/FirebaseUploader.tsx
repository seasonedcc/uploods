import firebase from 'firebase/app'
import 'firebase/storage'
import get from 'lodash/get'

import { UploodAPIConfig, ImageConfig, FileData, Uploader } from './typeDeclarations'
import { processFile } from './processFile'

const stateMap = {
  [firebase.storage.TaskState.PAUSED]: 'paused',
  [firebase.storage.TaskState.RUNNING]: 'running',
}

export class FirebaseUploader implements Uploader{
  storage: firebase.storage.Storage

  constructor(config: UploodAPIConfig) {
    const {apiKey, storageBucket} = config
    if (!apiKey  || !storageBucket){
      throw new Error('You must provide a Firebase apiKey and storageBucket')
    }
    if (!firebase.apps.length) firebase.initializeApp({apiKey, storageBucket})
    this.storage = firebase.storage()
  }

  upload = async (
    file: File,
    config: ImageConfig = {},
    progressFn?: (t: FileData) => void,
  ) => {
    const {fileToUpload, ...fileData} = await processFile(file, config)
    const metadata = { contentType: file.type }

    const storageRef = this.storage.ref()
    const uploadTask = storageRef.child(fileData.id).put(fileToUpload, metadata)
    const result: FileData = await new Promise(resolve =>
      uploadTask.on(
        'state_changed',
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          if (typeof progressFn === 'function') {
            const { bytesTransferred, totalBytes } = snapshot
            const percent = (bytesTransferred / totalBytes) * 100
            const state = get(stateMap, snapshot.state, 'running')
            progressFn({
              ...fileData,
              percent,
              state,
              uploadTask,
            })
          }
        },
        (error: Error) => {
          console.log(error)
        },
        async () => {
          const { fullPath, name, bucket } = uploadTask.snapshot.ref
          const url = await uploadTask.snapshot.ref.getDownloadURL()
          const { size, type } = fileToUpload
          resolve({
            ...fileData,
            percent: 100,
            state: 'done',
            uploadTask: null,
            size,
            type,
            name,
            fullPath,
            url,
            bucket,
          })
        },
      ),
    )
    return result
  }
}
