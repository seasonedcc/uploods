import React, { createContext } from 'react'

export const Context = createContext()

export const Provider = ({ config, children }) => (
  <Context.Provider value={config}>{children}</Context.Provider>
)
