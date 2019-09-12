import React, { useState, useEffect } from 'react'
import map from 'lodash/map'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { DropZone, Provider, DropPicture } from 'uploods'

const Example = () => {
  const [files, setFiles] = useState()
  const [config, setConfig] = useState({
    apiKey: process.env.REACT_APP_API_KEY,
    storageBucket: process.env.REACT_APP_BUCKET,
    mode: 'firebase',
  })
  useEffect(() => {
    if (!config.apiKey || !config.storageBucket) {
      const apiKey = prompt('Please enter your Firebase API key')
      const storageBucket = prompt('Please enter your Storage Bucket')
      setConfig({ ...config, apiKey, storageBucket })
    }
  }, [config])
  return !config.apiKey || !config.storageBucket ? null : (
    <Provider {...config}>
      <Card elevation={5}>
        <CardHeader title="DropPicture" />
        <CardContent>
          <DropPicture
            overwrite
            initialSrc="https://source.unsplash.com/random/200x200"
            maxDimension={200}
            quality={1}
            onChange={() => console.log('Uploaded!')}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { DropPicture } from 'uploods'

// MyComponent
const [file, setFile] = useState([])
<DropPicture
  overwrite
  maxDimension={200}
  quality={1 /* 0.1-1 */}
  initialSrc="https://source.unsplash.com/random/200x200"
  onChange={setFile}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="DropZone Accept Images and overwrite equal" />
        <CardContent>
          {files && !!Object.keys(files).length && (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {map(files, (file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
          <DropZone
            containerStyle={{ margin: '1rem auto' }}
            overwrite
            accept={['image/*']}
            onChange={setFiles}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { DropZone } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<DropZone
  overwrite
  accept={['image/*']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="DropZone Accept PDF" />
        <CardContent>
          <DropZone
            containerStyle={{ margin: '1rem auto' }}
            accept={['application/pdf']}
            onChange={() => null}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { DropZone } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<DropZone
  accept={['application/pdf']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Configuring" />
        <CardContent>
          <p>
            If you want to autoUpload to firebase, you must provide some
            firebase basic configuration and the autoUpload flag as true.
          </p>
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { DropZone, Provider } from 'uploods'

// With a provider
<Provider
  storageBucket="MyFirebaseBucket"
  apiKey="MyFirebaseAPIKey"
  autoUpload
>
  <DropZone ... />
</Provider>

// Or in the DropZone call
<DropZone config={{ apiKey, storageBucket }} ... />
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Using the Uploods class" />
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Uploods } from 'uploods'

// First initialize with your firebase info (if you want autoUpload)
const api = new Uploods({ apiKey, storageBucket, autoUpload })
// Then call the upload function
api.process(myFile).then(fileData =>
  console.log(
    fileData.url,
    fileData.fullPath,
    fileData.type,
    fileData.state,
    // ...
  ))

// If you want to resize images before uploading
api.process(myFile, {
  maxDimension: 400,
  quality: .4,
}).then(/* ... */)

// If you want to monitor progress
api.process(myFile, myConfig, file => {
  console.log(
    file.id, // the path in which the file is stored
    file.name // the filename
    file.percent // number 0-100
    file.state // 'paused' | 'running' | 'done'
    file.type // the file contentType
    file.size // the size in number of bytes
    file.parsed // a base64 string version of the file
    file.fullPath // only when upload is completed
    file.url // when completed, the url to see the image
    file.bucket // only when completed
    file.uploadTask // you can cancel the upload
    // by calling: file.uploadTask.cancel()
    // you can also file.uploadTask.pause()
    // and file.uploadTask.resume()
  )
})
`}
        </SyntaxHighlighter>
      </Card>
    </Provider>
  )
}

export default Example
