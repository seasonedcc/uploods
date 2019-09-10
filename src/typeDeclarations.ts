export interface UploodAPIConfig {
  apiKey?: string
  storageBucket?: string
  mode: string
  url?: string
}

export interface ImageConfig {
  prefix?: string
  maxDimension?: number
  quality?: number
  overwrite?: boolean
}

export interface FileData {
  name: string
  id: string
  percent: number
  state: string
  uploadTask: null | firebase.storage.UploadTask
  type: string
  size?: number
  parsed?: string | ArrayBuffer | null
  fullPath?: string
  url?: string
  bucket?: string
}

export type FileState = { [key: string]: FileData }

export type Uploader = {
  upload: (
    file: File,
    config: ImageConfig,
    progressFn?: (t: FileData) => void,
  ) => Promise<FileData>
}
