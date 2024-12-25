import { ContextProvider } from "../Context/AuthContext";
import { useContext } from 'react'

const useAuth = () => {
    return useContext(ContextProvider);
}

export default useAuth