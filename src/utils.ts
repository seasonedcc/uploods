export const humanizeBytes = (size: number = 0) => {
  const i: number = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  const bytes = (size / 1024 ** i).toFixed(2)
  return `${bytes} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
}

export const clipName = (text: string, size = 35) =>
  text.length < size
    ? text
    : `${text.slice(0, size - 13)}...${text.slice(text.length - size - 25)}`

export const fileToBase64 = async (
  file: File,
): Promise<string | ArrayBuffer | null> => {
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

export const getFileData = async (file: File) => {
  const { name, type, size } = file
  const parsed: string | ArrayBuffer | null = await fileToBase64(file)
  return { name, type, size, parsed }
}
