import React, { Fragment, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'

import Uploods from 'uploods'

const Example = () => {
  const [files, setFiles] = useState([])
  return (
    <Fragment>
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
          <Uploods accept={['image/*']} onChange={setFiles} />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import Uploods from 'seasoned-evaluator'

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
          <Uploods accept={['application/pdf']} onChange={() => null} />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import Uploods from 'seasoned-evaluator'

// MyComponent
const [files, setFiles] = useState([])
<Uploods
  accept={['application/pdf']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
    </Fragment>
  )
}

export default Example
