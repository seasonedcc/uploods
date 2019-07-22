import React, { useState, useMemo, useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import { AddAPhoto, CloudDone } from '@material-ui/icons'
import ReactDropzone from 'react-dropzone'
import { Context } from './Provider'
import { Uploods } from './Uploods'
import styles from './styles'
// @ts-ignore
import { LinearGradient, Countdown } from '@seasonedsoftware/utils/dist/ui'
import { FileData, UploodAPIConfig } from './typeDeclarations'

const gradientColors = [1, 0.5, 0.1, 0, 0].map(n => `rgba(0,0,0,${n})`)

export const DropPicture = ({
  onChange,
  maxSize = 10000,
  maxDimension,
  quality,
  overwrite,
  wrapperStyle,
  prefix = 'droppicture',
  initialSrc,
  config,
}: DropPictureProps) => {
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState(false)
  const inheritedConfig = useContext(Context)
  const api = useMemo(
    () => new Uploods((config || inheritedConfig) as UploodAPIConfig),
    [],
  )

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
          style={{
            width: maxDimension || '100%',
            height: maxDimension || '100%',
            ...styles.pictureWrapper,
            ...wrapperStyle,
          }}
        >
          <input {...getInputProps()} style={styles.pictureInput} />
          <img
            style={styles.pictureImg}
            src={src}
            className={isDragActive ? 'active' : 'active'}
          />
          <LinearGradient deg={0} colors={gradientColors}>
            <div style={styles.pictureGradient} />
          </LinearGradient>
          {uploaded ? (
            <>
              <Countdown active time={3} onFinish={() => setUploaded(false)} />
              <CloudDone style={styles.pictureIcon} color="inherit" />
            </>
          ) : file && file.state === 'running' ? (
            <CircularProgress
              color="inherit"
              size={23}
              style={styles.pictureIcon}
            />
          ) : (
            <AddAPhoto style={styles.pictureIcon} color="inherit" />
          )}
        </div>
      )}
    </ReactDropzone>
  )

  async function uploadFiles(accepted: File[]) {
    if (accepted.length) {
      const [file] = accepted
      const uploaded = await api.upload(
        file,
        { prefix, maxDimension, quality, overwrite },
        setFile,
      )
      setFile(uploaded)
      setUploaded(true)
      onChange(uploaded)
    }
  }
}

interface DropPictureProps {
  onChange: (t: FileData) => void
  maxSize?: number
  maxDimension?: number
  overwrite?: boolean
  quality?: number
  prefix?: string
  wrapperStyle?: any
  initialSrc?: string
  config?: UploodAPIConfig
  // Component: string | JSX.Element
}
