import React, { useState, useMemo, useContext } from 'react'
import ReactDropzone from 'react-dropzone'
import { Context } from './Provider'
import { Uploods } from './Uploods'
import { FileData, UploodAPIConfig } from './typeDeclarations'

export const DropPicture = ({
  onChange,
  maxSize = 10000,
  maxDimension,
  wrapperStyle,
  imgStyle,
  prefix = 'droppicture',
  initialSrc,
  config,
}: DropPictureProps) => {
  const [file, setFile] = useState()
  const inheritedConfig = useContext(Context)
  const fireConfig = config || inheritedConfig

  if (!fireConfig || !Object.keys(fireConfig).length) {
    throw new Error('You must provide a Firebase app config object')
  }

  const api = useMemo(() => new Uploods(fireConfig as UploodAPIConfig), [])

  const src = file ? file.url || file.parsed : initialSrc

  return (
    <ReactDropzone
      accept="image/*"
      maxSize={maxSize * 1000}
      multiple={false}
      onDrop={uploadFiles}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          style={{ width: maxDimension || '100%', ...wrapperStyle }}
        >
          <input
            {...getInputProps()}
            style={{
              maxWidth: '100%',
              position: 'absolute',
              opacity: 0,
              ...imgStyle,
            }}
          />
          <img
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src={src}
            className={isDragActive ? 'active' : 'active'}
          />
        </div>
      )}
    </ReactDropzone>
  )

  async function uploadFiles(accepted: File[]) {
    if (accepted.length) {
      const [file] = accepted
      const uploaded = await api.upload(file, { prefix, maxDimension }, setFile)
      setFile(uploaded)
      onChange(uploaded)
    }
  }
}

interface DropPictureProps {
  onChange: (t: FileData) => void
  maxSize?: number
  maxDimension?: number
  prefix?: string
  wrapperStyle?: any
  imgStyle?: any
  initialSrc?: string
  config?: UploodAPIConfig
  // Component: string | JSX.Element
}
