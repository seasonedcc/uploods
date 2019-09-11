import { NonUploader } from '../NonUploader'

jest.mock('@seasonedsoftware/utils', () => ({
  fileToBase64: () => 'image/foobar',
}))

jest.mock('../utils', () => ({
  getFileData: () => ({ name: 'image', size: 2000 }),
  prepareImage: () => ({ name: 'image', size: 2000 }),
}))

it('returns a promise with image details', async () => {
  const uploader = new NonUploader()

  const result = await uploader.upload({ type: 'jpg', name: 'file' })

  expect(result).toEqual(
    expect.objectContaining({ state: 'done', percent: 100, type: 'jpg' }),
  )
})
