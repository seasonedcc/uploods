export interface UploodAPIConfig {
  apiKey: string
  storageBucket: string
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
