import get from 'lodash/get'

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
