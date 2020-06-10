import React, { useState, useMemo, useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import CloudDone from '@material-ui/icons/CloudDone'
import ReactDropzone from 'react-dropzone'
import { Context } from './Provider'
import { Uploods } from './Uploods'
import styles from './styles'
// @ts-ignore
import { Countdown } from '@seasonedsoftware/utils/dist/ui'
import { UploodAPIConfig, FileData } from './typeDeclarations'

const DefaultBackground = () => (
  <div style={styles.pictureBackground}>
    <AddAPhoto
      fontSize="large"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  </div>
)

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
  autoRotate = false,
  background = <DefaultBackground />,
}: DropPictureProps) => {
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('idle')
  const inheritedConfig = useContext(Context)
  const api = useMemo(
    () => new Uploods((config || inheritedConfig) as UploodAPIConfig),
    []
  )
  useEffect(() => {
    if (onChange) {
      onChange(file, uploadStatus)
    }
  }, [file, uploadStatus])

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
          {src ? (
            <img
              style={styles.pictureImg}
              src={src}
              className={isDragActive ? 'active' : 'active'}
            />
          ) : (
            background
          )}

          {uploaded ? (
            <>
              <Countdown active time={3} onFinish={() => setUploaded(false)} />
              <CloudDone style={styles.pictureIcon} color="inherit" />
            </>
          ) : (
            file &&
            file.state === 'running' && (
              <CircularProgress
                color="inherit"
                size={23}
                style={styles.pictureIcon}
              />
            )
          )}
        </div>
      )}
    </ReactDropzone>
  )

  async function uploadFiles(accepted: File[]) {
    if (accepted.length) {
      const [file] = accepted

      setUploadStatus('uploading')
      const uploaded = await api.process(
        file,
        { prefix, maxDimension, quality, overwrite, autoRotate },
        setFile
      )
      setUploadStatus('done')
      setFile(uploaded)
      setUploaded(true)
    }
  }
}

interface DropPictureProps {
  onChange: (t?: FileData, a?: string) => void
  maxSize?: number
  maxDimension?: number
  overwrite?: boolean
  quality?: number
  prefix?: string
  wrapperStyle?: any
  initialSrc?: string
  config?: UploodAPIConfig
  autoRotate?: boolean
  background?: JSX.Element | Element
  // Component: string | JSX.Element
}
