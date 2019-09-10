import compact from 'lodash/compact'

const axios = require('axios')

import { getFileData, prepareImage, toBase64 } from './utils'
import {
  UploodAPIConfig,
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'

export class ApiUploader implements Uploader {
  url: string | undefined

  constructor(config: UploodAPIConfig) {
    this.url = config.url
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
    const fileToUpload = await toBase64(await prepareImage(file, config))
    const id = compact(['uploods', config.prefix, finalName]).join('/')

    const res = await axios.post(this.url, {
      id,
      name: finalName,
      data: fileToUpload,
    },
    {
      onUploadProgress: (progressEvent: any) => {
        if (typeof progressFn === 'function') {
          progressFn({
            ...fileData,
            name: finalName,
            id,
            percent: parseInt(`${progressEvent.loaded/progressEvent.total * 100}`, 10),
            state: 'running',
            uploadTask: null,
            type: file.type,
          })
        }
      }
    })

    const result: FileData = {
        ...fileData,
        name: finalName,
        id,
        percent: 100,
        state: 'done',
        uploadTask: null,
        type: file.type,
    }

    return new Promise<FileData>((resolve, reject) => {
      if(res.status >= 200 && res.status < 300){
        return resolve(result)
      }
      return reject('Upload failed')
    })
  }
}
