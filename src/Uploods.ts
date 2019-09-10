import {
  UploodAPIConfig,
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'
import { FirebaseUploader } from './FirebaseUploader'
import { ApiUploader } from './ApiUploader'

export class Uploods {
  uploader: Uploader

  constructor(config: UploodAPIConfig) {
    this.uploader =
      config.mode && config.mode === 'firebase'
        ? new FirebaseUploader(config)
        : new ApiUploader(config)
  }

  upload = async (
    file: File,
    config: ImageConfig = {},
    progressFn?: (t: FileData) => void,
  ) => {
    this.uploader.upload(file, config, progressFn)
  }
}
