import React, { Component } from 'react'
import { render } from 'react-dom'
import { CroodsProvider, Fetch, useCroods } from 'croods'

import Uplood from '../../src'

const Demo = props => {
  // const [state, { save }] = useCroods({ name: 'profile' })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Uplood setField={value => console.log('field', value)} />
    </div>
  )
}

const App = props => {
  return (
    <CroodsProvider
      debugRequests
      debugActions
      baseUrl="https://reqres.in/api/"
      parseResponse={({ data }) => data.data}
    >
      <Demo />
    </CroodsProvider>
  )
}

render(<App />, document.querySelector('#demo'))
