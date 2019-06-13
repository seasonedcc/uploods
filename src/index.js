import React, { Component, useState, useCallback, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FilesList from './FilesList'

export default ({
  setField,
  initialValues,
  width = '100%',
  containerStyle,
  hideList,
  maxSize = 100000,

  text = 'Drag and drop some files here, or click to select files',

  ...props
}) => {
  const [files, setFiles] = useState([])
  const error = 'error'
  // Parses a file and returns a promisse that resolves to base64 string.
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
  const renderDragMessage = ({ isDragActive, isDragReject, rejectedFiles }) => {
    let text = 'Arraste os arquivos aqui'
    if (isDragActive) {
      text = 'Solte os arquivos aqui'
    }
    if (rejectedFiles.length || isDragReject) {
      text = 'Arquivo não suportado'
      clearTimeout()
      setTimeout(() => {
        console.log('timeout?')
        text = 'Arraste os arquivos aqui'
      }, 3000)
    }

    return <Typography type="success">{text}</Typography>
  }

  useEffect(() => {
    if (files.length > 0) {
      const list = files.map(file => file.parsed)
      const output = list.length > 1 ? list : list[0]
      setField(output)
    }
    // eslint-disable-next-line
  }, [files])

  return (
    <Paper
      style={{
        width,
        ...containerStyle,
      }}
      elevation={0}
    >
      <Dropzone
        maxSize={maxSize}
        onDrop={async acceptedFiles => {
          console.log('acc', [...acceptedFiles[0]])
          const parsedFiles = await Promise.all(
            acceptedFiles.map(async file => {
              const { path, name, type, size } = file
              return {
                path,
                name,
                type,
                size,
                parsed: await parseFile(file),
              }
            }),
          )
          setFiles([...files, ...parsedFiles])
        }}
      >
        {({ getRootProps, getInputProps, ...props }) => (
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
            }}
          >
            <input {...getInputProps()} />
            {renderDragMessage(props)}
          </div>
        )}
      </Dropzone>
      {hideList || <FilesList files={files} />}
    </Paper>
  )
}
