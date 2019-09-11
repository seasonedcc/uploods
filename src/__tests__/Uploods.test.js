import { Uploods } from '../Uploods'
import { FirebaseUploader } from '../FirebaseUploader'
import { NonUploader } from '../NonUploader'

describe('when firebase config flag is true', () => {
  it('instantiates a FirebaseUploader', () => {
    const config = {
      firebase: true,
      apiKey: 'foobar',
      storageBucket: 'foobar',
    }

    const uploods = new Uploods(config)

    expect(uploods.uploader instanceof FirebaseUploader).toBeTruthy()
  })
})

describe('when firebase config flag is false', () => {
  it('instantiates a NonUploader', () => {
    const config = {}

    const uploods = new Uploods(config)

    expect(uploods.uploader instanceof NonUploader).toBeTruthy()
  })
})
