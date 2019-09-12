import { humanizeBytes, getFileData, processFile } from '../utils'

jest.mock('@seasonedsoftware/utils', () => ({
  fileToBase64: async () => 'foobar',
}))

describe('humanizeBytes', () => {
  it('returns correctly', () => {
    const size = 2621440
    expect(humanizeBytes(size)).toEqual('2.50 MB')
  })
})

describe('getFileData', () => {
  const file = new File(['foobar'], 'filename', { type: 'text/html' })
  it('returns correctly', async () => {
    expect(await getFileData(file)).toEqual({
      name: 'filename',
      type: 'text/html',
      size: 6,
      parsed: 'foobar',
    })
  })
})

describe('processFile', () => {
  const file = new File(['foobar'], 'filename', { type: 'text/html' })
  it('returns correctly', async () => {
    expect(await processFile(file, { overwrite: true })).toEqual(
      expect.objectContaining({
        name: 'filename',
        type: 'text/html',
        size: 6,
        parsed: 'foobar',
        id: 'uploods/filename',
      }),
    )
  })
})
