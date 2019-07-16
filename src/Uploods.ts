import firebase from 'firebase/app'
import 'firebase/storage'
import compact from 'lodash/compact'
import get from 'lodash/get'

import { getFileData } from './utils'
import { UploodAPIConfig, ImageConfig, FileData } from './typeDeclarations'

const stateMap = {
  [firebase.storage.TaskState.PAUSED]: 'paused',
  [firebase.storage.TaskState.RUNNING]: 'running',
}

const { readAndCompressImage } = require('browser-image-resizer')

export class Uploods {
  storage: firebase.storage.Storage

  constructor(config: UploodAPIConfig) {
    if (!config || Object.keys(config).length !== 2) {
      throw new Error('You must provide a Firebase app config object')
    }

    if (!firebase.apps.length) firebase.initializeApp(config)
    this.storage = firebase.storage()
  }

  upload = async (
    file: File,
    config: ImageConfig = {},
    progressFn?: (t: FileData) => void,
  ) => {
    const fileData = await getFileData(file)
    const timeStamp = new Date().getTime().toString()
    const finalName = config.overwrite
      ? fileData.name
      : `${timeStamp}-${fileData.name}`
    const fileToUpload = await this.prepareImage(file, config)
    const storageRef = this.storage.ref()
    const id = compact(['uploods', config.prefix, finalName]).join('/')
    const metadata = { contentType: file.type }
    const uploadTask = storageRef.child(id).put(fileToUpload, metadata)
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
              name: finalName,
              id,
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
            id,
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

  prepareImage = async (file: File, { maxDimension, quality }: ImageConfig) => {
    const [typePrefix] = file.type.split('/')
    if (typePrefix === 'image' && (maxDimension || quality)) {
      const config = {
        maxWidth: maxDimension,
        maxHeight: maxDimension,
        quality,
      }
      const image = await readAndCompressImage(file, config)
      return image
    }
    return file
  }
}
