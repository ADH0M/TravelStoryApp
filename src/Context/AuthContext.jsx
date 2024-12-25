/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const ContextProvider =createContext();

const AuthContext = ({children}) => {
    const [auth , setAuth ] = useState({})
  return (
    <ContextProvider.Provider value={{auth , setAuth}} >
        {children}
    </ContextProvider.Provider>
  )
}

export default AuthContext;