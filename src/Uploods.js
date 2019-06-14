import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import FormHelperText from '@material-ui/core/FormHelperText'
import uniqueId from 'lodash/uniqueId'
import FilesList from './FilesList'
import { sleep } from './utils'
import styles from './styles'

const Uploods = ({
  onChange,
  width,
  containerStyle,
  inputStyle,
  hideList,
  accept,
  maxSize,
  elevation,
  text,
  dragActiveText,
  unsupportedText,
}) => {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState(text)

  // Parses one file and returns a promisse that resolves to base64 string.
  const parseFile = async file => {
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

  useEffect(() => {
    const list = files.map(file => file.parsed)
    onChange(list)
  }, [files])

  return (
    <Paper
      style={{ width, ...styles.container, ...containerStyle }}
      elevation={elevation}
    >
      <Dropzone
        acceptedFiles={accept}
        maxSize={maxSize * 1000}
        onDropRejected={async () => {
          setMessage(unsupportedText)
          await sleep(3000)
          setMessage(text)
        }}
        onDrop={async acceptedFiles => {
          const parsedFiles = await Promise.all(
            acceptedFiles.map(async file => {
              const { path, name, type, size } = file
              return {
                path,
                name,
                type,
                size,
                id: uniqueId(),
                parsed: await parseFile(file),
              }
            }),
          )
          setFiles([...files, ...parsedFiles])
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

      {hideList || <FilesList files={files} setFiles={setFiles} />}
    </Paper>
  )
}

Uploods.propTypes = {
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hideList: PropTypes.bool,
  accept: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  elevation: PropTypes.number,
  text: PropTypes.string,
  dragActiveText: PropTypes.string,
  unsupportedText: PropTypes.string,
}

Uploods.defaultProps = {
  width: '100%',
  maxSize: 10000,
  elevation: 0,
  text: 'Drag some files here, or click to select files',
  dragActiveText: 'Drop here!',
  unsupportedText: 'Unsupported File...',
}

export default Uploods
