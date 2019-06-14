import React, { useState } from 'react'
import { render } from 'react-dom'
import Uplood from '../../src'

const App = () => {
  const [files, setFiles] = useState([])
  console.log(files)
  return (
    <div style={{ background: '#653e94', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <Uplood accept={['image/*', 'application/pdf']} onChange={setFiles} />
      </div>
    </div>
  )
}

render(<App />, document.querySelector('#demo'))
