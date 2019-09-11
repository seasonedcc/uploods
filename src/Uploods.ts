import {
  UploodAPIConfig,
  ImageConfig,
  FileData,
  Uploader,
} from './typeDeclarations'
import { FirebaseUploader } from './FirebaseUploader'
import { NonUploader } from './NonUploader'

export class Uploods {
  uploader: Uploader

  constructor(config: UploodAPIConfig) {
    this.uploader = config.firebase
      ? new FirebaseUploader(config)
      : new NonUploader()
  }

  upload = async (
    file: File,
    config: ImageConfig = {},
    progressFn?: (t: FileData) => void,
  ) => {
    return this.uploader.upload(file, config, progressFn)
  }
}
