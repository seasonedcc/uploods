import React, { useState, useMemo, useContext } from 'react'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'
import ReactDropzone from 'react-dropzone'
import { Paper, FormHelperText } from '@material-ui/core'
import FilesList from './FilesList'
import dropzoneStyles from './dropzoneStyles'
import { Context } from './Provider'
import { Uploods } from './Uploods'
import { FileData, FileState, UploodAPIConfig } from './typeDeclarations'

export const DropZone = ({
  onChange,
  containerStyle,
  inputStyle,
  hideList,
  accept,
  maxSize = 10000,
  maxDimension,
  prefix = 'dropzone',
  paperProps = { evelation: 0 },
  text = 'Drag some files here, or click to select files',
  config,
  dragActiveText = 'Drop here!',
  unsupportedText = 'Unsupported File...',
}: DropZoneProps) => {
  const [files, setFiles] = useState({})
  const [message, setMessage] = useState(text)
  const inheritedConfig = useContext(Context)
  const fireConfig = config || inheritedConfig

  if (!fireConfig || !Object.keys(fireConfig).length) {
    throw new Error('You must provide a Firebase app config object')
  }

  const api = useMemo(() => new Uploods(fireConfig as UploodAPIConfig), [])

  return (
    <Paper style={{ padding: '10px', ...containerStyle }} {...paperProps}>
      <ReactDropzone
        accept={accept}
        maxSize={maxSize * 1000}
        onDropRejected={async () => {
          setMessage(unsupportedText)
          setMessage(text)
        }}
        onDrop={uploadFiles}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} style={{ ...dropzoneStyles, ...inputStyle }}>
            <input {...getInputProps()} />
            <FormHelperText error={message === unsupportedText}>
              {isDragActive ? dragActiveText : message}
            </FormHelperText>
          </div>
        )}
      </ReactDropzone>

      {hideList || <FilesList files={files} removeFile={removeFile} />}
    </Paper>
  )

  async function uploadFiles(accepted: File[]) {
    const uploadedFiles: FileData[] = await Promise.all(
      accepted.map((file: File) =>
        api.upload(file, { prefix, maxDimension }, setFile),
      ),
    )
    const parsedFiles = reduce(
      uploadedFiles,
      (sum: FileState, curr: FileData) => {
        sum[curr.id] = curr
        return sum
      },
      {},
    )
    const allFiles = { ...files, ...parsedFiles }
    setFiles(allFiles)
    emitChange(allFiles)
  }

  function emitChange(files: FileState) {
    const emitted = map(files, val => omit(val, ['parsed']))
    onChange(emitted)
  }

  function setFile(file: FileData) {
    setFiles(filesObj => ({ ...filesObj, [file.id]: file }))
  }

  function removeFile(id: string) {
    const allFiles = omit(files, id)
    setFiles(allFiles)
    emitChange(allFiles)
  }
}

interface DropZoneProps {
  onChange: (t: FileData[]) => void
  containerStyle?: any
  inputStyle?: any
  hideList?: boolean
  accept?: string[]
  maxSize?: number
  maxDimension?: number
  paperProps?: any
  prefix?: string
  text?: string
  dragActiveText?: string
  unsupportedText?: string
  config?: UploodAPIConfig
}

DropZone.propTypes = {
  onChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hideList: PropTypes.bool,
  accept: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  maxDimension: PropTypes.number,
  paperProps: PropTypes.object,
  config: PropTypes.object,
  text: PropTypes.string,
  dragActiveText: PropTypes.string,
  unsupportedText: PropTypes.string,
}
