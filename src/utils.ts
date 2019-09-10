// @ts-ignore
import { fileToBase64 } from '@seasonedsoftware/utils/dist/helpers'
import { ImageConfig } from './typeDeclarations'

const { readAndCompressImage } = require('browser-image-resizer')

export const humanizeBytes = (size: number = 0) => {
  const i: number = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  const bytes = (size / 1024 ** i).toFixed(2)
  return `${bytes} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
}

export const getFileData = async (file: File) => {
  const { name, type, size } = file
  const parsed: string | ArrayBuffer | null = await fileToBase64(file)
  return { name, type, size, parsed }
}

export const prepareImage = async (
  file: File,
  { maxDimension, quality }: ImageConfig,
) => {
  const [typePrefix] = file.type.split('/')
  if (typePrefix === 'image' && (maxDimension || quality)) {
    const config = {
      maxWidth: maxDimension,
      maxHeight: maxDimension,
      quality,
    }
    const image = await readAndCompressImage(file, config)
    return image
  }
  return file
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })