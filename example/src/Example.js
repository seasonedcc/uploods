import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'

import { Uploods, Provider } from 'uploods'

const config = {
  apiKey: 'XXXXXXX',
  authDomain: 'XXXXXXX',
  databaseURL: 'XXXXXXX',
  projectId: 'XXXXXXX',
  storageBucket: 'XXXXXXX',
  messagingSenderId: 'XXXXXXX',
  appId: 'XXXXXXX',
}

const Example = () => {
  const [files, setFiles] = useState([])
  return (
    <Provider config={config}>
      <Card elevation={5}>
        <CardHeader title="Accept Images" />
        <CardContent>
          {!!files.length && (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
          <Uploods
            config={config}
            containerStyle={{ margin: '1rem auto' }}
            accept={['image/*']}
            onChange={setFiles}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Uploods } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<Uploods
  accept={['image/*']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Accept PDF" />
        <CardContent>
          <Uploods
            containerStyle={{ margin: '1rem auto' }}
            accept={['application/pdf']}
            onChange={() => null}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Uploods } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<Uploods
  accept={['application/pdf']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
    </Provider>
  )
}

export default Example
