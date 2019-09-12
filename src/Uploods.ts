import {
  UploodAPIConfig,
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'
import { FirebaseUploader } from './FirebaseUploader'
import { processFile } from './processFile'

export class Uploods {
  uploader: Uploader | null

  constructor(config: UploodAPIConfig) {
    this.uploader = config.autoUpload ? new FirebaseUploader(config) : null
  }

  process = async (
    file: File,
    config: ImageConfig = {},
    progressFn?: (t: FileData) => void,
  ): Promise<FileData> => {
    const processedFile = await processFile(file, config)

    if (this.uploader) return this.uploader.upload(processedFile, progressFn)

    const { fileToUpload, ...fileData } = processedFile
    const result: FileData = {
      ...fileData,
      percent: 100,
      state: 'done',
      uploadTask: null,
    }
    return new Promise<FileData>(resolve => {
      return resolve(result)
    })
  }
}
