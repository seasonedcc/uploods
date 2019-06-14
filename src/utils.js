import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'

export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const humanizeBytes = size => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / 1024 ** i).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`
}

export const clipName = (text, size = 35) =>
  text.length < size
    ? text
    : `${text.slice(0, size - 13)}...${text.slice(text.length - size - 25)}`

export const filterById = (items, id) =>
  items.filter(item => get(item, 'id') !== id)

export const fileToBase64 = async file => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export const getFileObject = async file => {
  const { path, name, type, size } = file
  const id = uniqueId('file-')
  const parsed = await fileToBase64(file)
  return { path, name, type, size, id, parsed }
}
