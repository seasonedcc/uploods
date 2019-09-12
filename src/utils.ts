import compact from 'lodash/compact'
// @ts-ignore
import { fileToBase64 } from '@seasonedsoftware/utils'
import { ImageConfig, ProcessedFileData } from './typeDeclarations'

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

export const processFile = async (
  file: File,
  config: ImageConfig = {},
): Promise<ProcessedFileData> => {
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
