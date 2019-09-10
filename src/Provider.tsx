import React, { createContext } from 'react'
import { UploodAPIConfig } from './typeDeclarations'

export const Context = createContext({})

interface ProviderConfig extends UploodAPIConfig {
  children?: any
}

export const Provider = ({
  children,
  ...props
}: ProviderConfig) => (
  <Context.Provider value={props}>
    {children}
  </Context.Provider>
)
