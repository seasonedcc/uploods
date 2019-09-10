import compact from 'lodash/compact'

import { getFileData, prepareImage } from './utils'
import {
  UploodAPIConfig,
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'

export class ApiUploader implements Uploader {
  send: ((...args: any[]) => null | any) | undefined

  constructor(config: UploodAPIConfig) {
    this.send = config.send
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
    const fileToUpload = await prepareImage(file, config)
    const id = compact(['uploods', config.prefix, finalName]).join('/')
    const metadata = { contentType: file.type }
    const result: FileData = await new Promise(resolve => {
      resolve({
        name: finalName,
        id,
        percent: 0,
        state: 'running',
        uploadTask: null,
        type: file.type,
      })
    })
    return result
  }
}
