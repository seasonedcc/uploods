import compact from 'lodash/compact'

import { getFileData, prepareImage } from './utils'
import {
  ImageConfig,
  FileData,
  Uploader,
  ProcessedFileData,
} from './typeDeclarations'


export const processFile = async (file: File, config: ImageConfig = {}): Promise<ProcessedFileData> => {
    const preparedFile = await prepareImage(file, config)
    const fileData = await getFileData(preparedFile)
    const timeStamp = new Date().getTime().toString()
    const finalName = config.overwrite
      ? fileData.name
      : `${timeStamp}-${fileData.name}`
    const id = compact(['uploods', config.prefix, finalName]).join('/')

    return {
        ...fileData,
        name: finalName,
        id,
        fileToUpload: preparedFile,
    }
}
