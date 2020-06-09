export interface UploodAPIConfig {
  apiKey?: string
  storageBucket?: string
  autoUpload: boolean
}

export interface ImageConfig {
  prefix?: string
  maxDimension?: number
  quality?: number
  overwrite?: boolean
  autoRotate?: boolean
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

export interface ProcessedFileData {
  name: string
  id: string
  type: string
  size?: number
  parsed?: string | ArrayBuffer | null
  fileToUpload: File
}

export type FileState = { [key: string]: FileData }

export type Uploader = {
  upload: (
    file: ProcessedFileData,
    progressFn?: (t: FileData) => void,
  ) => Promise<FileData>
}
