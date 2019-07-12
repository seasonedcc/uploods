import firebase from 'firebase/app'
import 'firebase/storage'

const { readAndCompressImage } = require('browser-image-resizer')

export default class Uplooder {
  constructor(config) {
    if (!firebase.apps.length) firebase.initializeApp(config)
    this.storage = firebase.storage()
  }

  upload = async (
    file,
    { prefix = new Date().getTime().toString(), maxWidth, maxHeight },
  ) => {
    let image
    const [typePrefix] = file.type.split('/')
    if (typePrefix === 'image' && (maxWidth || maxHeight)) {
      const config = { maxWidth, maxHeight }
      image = await readAndCompressImage(file, config)
    }
    const result = await this.storage
      .ref()
      .child('uploods')
      .child(prefix)
      .child(file.name)
      .put(image || file)
    const fileUrl = await result.ref.getDownloadURL()
    return fileUrl
  }
}
