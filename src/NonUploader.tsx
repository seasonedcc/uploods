import compact from 'lodash/compact'
import { fileToBase64 } from '@seasonedsoftware/utils'

import { getFileData, prepareImage } from './utils'
import {
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'

export class NonUploader implements Uploader {
  upload = async (
    file: File,
    config: ImageConfig = {},
  ) => {
    const fileData = await getFileData(file)
    const timeStamp = new Date().getTime().toString()
    const finalName = config.overwrite
      ? fileData.name
      : `${timeStamp}-${fileData.name}`
    const fileToUpload = await fileToBase64(await prepareImage(file, config))
    const id = compact(['uploods', config.prefix, finalName]).join('/')

    const result: FileData = {
        ...fileData,
        name: finalName,
        id,
        percent: 100,
        state: 'done',
        uploadTask: null,
        type: file.type,
        parsed: fileToUpload,
    }

    return new Promise<FileData>((resolve) => {
        return resolve(result)
    })
  }
}
