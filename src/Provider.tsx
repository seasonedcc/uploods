import React, { createContext } from 'react'
import { UploodAPIConfig } from './typeDeclarations'

export const Context = createContext({})

interface ProviderConfig extends UploodAPIConfig {
  children?: any
}

export const Provider = ({
  apiKey,
  storageBucket,
  children,
}: ProviderConfig) => (
  <Context.Provider value={{ apiKey, storageBucket }}>
    {children}
  </Context.Provider>
)
