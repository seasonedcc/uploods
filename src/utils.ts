// @ts-ignore
import { fileToBase64 } from '@seasonedsoftware/utils/dist/helpers'

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
