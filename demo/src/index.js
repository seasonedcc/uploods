import React, { Component } from 'react'
import { render } from 'react-dom'
import Uplood from '../../src'

const App = props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Uplood
        accept={['image/*']}
        onChange={files => console.log('files:', files)}
      />
    </div>
  )
}

render(<App />, document.querySelector('#demo'))
