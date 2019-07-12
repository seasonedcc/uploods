import React, { useState, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import FormHelperText from '@material-ui/core/FormHelperText'
import FilesList from './FilesList'
import { getFileObject } from './utils'
import styles from './styles'
import { Context } from './Provider'
import Uplooder from './Uplooder'

export const Uploods = ({
  onChange,
  containerStyle,
  inputStyle,
  hideList,
  accept,
  maxSize,
  paperProps,
  text,
  config,
  dragActiveText,
  unsupportedText,
}) => {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState(text)
  const inheritedConfig = useContext(Context)
  const fireConfig = config || inheritedConfig

  if (!fireConfig) {
    throw new Error('You must provide a Firebase app config object')
  }

  const api = useMemo(() => new Uplooder(fireConfig))

  return (
    <Paper style={{ ...styles.container, ...containerStyle }} {...paperProps}>
      <Dropzone
        acceptedFiles={accept}
        maxSize={maxSize * 1000}
        onDropRejected={async () => {
          setMessage(unsupportedText)
          setMessage(text)
        }}
        onDrop={async accepted => {
          const parsedFiles = await Promise.all(accepted.map(getFileObject))
          const filesList = [...files, ...parsedFiles]
          setFiles(filesList)
          onChange(filesList)
          await uploadFiles(accepted)
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            style={{ ...styles.dropzone, ...inputStyle }}
          >
            <input {...getInputProps()} />
            <FormHelperText error={message === unsupportedText}>
              {isDragActive ? dragActiveText : message}
            </FormHelperText>
          </div>
        )}
      </Dropzone>

      {!hideList && <FilesList files={files} setFiles={setFiles} />}
    </Paper>
  )

  async function uploadFiles(files) {
    const uploadedFiles = await Promise.all(files.map(api.upload))
    console.log(uploadedFiles)
  }
}

Uploods.propTypes = {
  onChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hideList: PropTypes.bool,
  accept: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  paperProps: PropTypes.object,
  config: PropTypes.object,
  text: PropTypes.string,
  dragActiveText: PropTypes.string,
  unsupportedText: PropTypes.string,
}

Uploods.defaultProps = {
  maxSize: 10000,
  paperProps: { evelation: 0 },
  text: 'Drag some files here, or click to select files',
  dragActiveText: 'Drop here!',
  unsupportedText: 'Unsupported File...',
}
