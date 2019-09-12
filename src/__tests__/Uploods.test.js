import { Uploods } from '../Uploods'
import { FirebaseUploader } from '../FirebaseUploader'

describe('when autoUpload config flag is true', () => {
  it('instantiates a FirebaseUploader', () => {
    const config = {
      autoUpload: true,
      apiKey: 'foobar',
      storageBucket: 'foobar',
    }

    const uploods = new Uploods(config)

    expect(uploods.uploader instanceof FirebaseUploader).toBeTruthy()
  })
})

describe('when autoUpload config flag is false', () => {
  it('instantiates a NonUploader', () => {
    const config = {}

    const uploods = new Uploods(config)

    expect(uploods.uploader).toBeNull()
  })
})
