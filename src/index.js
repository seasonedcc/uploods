import React, { Component, useState, useCallback, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import uniqueId from 'lodash/uniqueId'
import FilesList from './FilesList'

export default ({
  onChange,
  initialValues,
  width = '100%',
  containerStyle,
  inputStyle,
  hideList,
  accept,
  maxSize = 10000,
  elevation = 0,
  text = 'Drag some files here, or click to select files',
  dragActiveText = 'Drop here!',
  unsupportedText = 'Unsupported File...',
  ...props
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
    // const output = list.length > 1 || multiple ? list : list[0]
    onChange(list)
    // eslint-disable-next-line
  }, [files])

  return (
    <Paper
      style={{
        width,
        padding: '10px',
        ...containerStyle,
      }}
      elevation={elevation}
    >
      <Dropzone
        accept={({}, accept)}
        maxSize={maxSize * 1000}
        onDropRejected={aa => {
          setMessage(unsupportedText)
          setTimeout(() => {
            setMessage(text)
          }, 3000)
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
            style={{
              border: '1px dashed #ddd',
              borderRadius: '4px',
              padding: '15px',
              cursor: 'pointer',
              transition: 'height 0.2s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...inputStyle,
            }}
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
