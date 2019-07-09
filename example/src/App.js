import React from 'react'
import { Router } from '@reach/router'
import basePath from './basePath'
import Example from './Example'

import './App.css'

const App = () => (
  <div className="App">
    <Router basepath={basePath}>
      <Example path="/" />
    </Router>
  </div>
)

export default App
