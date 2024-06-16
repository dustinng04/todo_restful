import { createContext, useContext, useState } from "react"
import { executeBasicAuthService } from "../../api/HWApiService"
import { apiClient } from "../../api/ApiClient"
import { executeJwtAuthService, executeJưtAuthService } from "../../api/AuthServiceApi"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext) 

// Put states into the context

export default function AuthProvider({children}) {

    // Put state to context
    const [number, setNumber] = useState(0)

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // async function login(username, password) {
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password) 
    //     try {
    //         const response = await executeBasicAuthService(baToken)
    
    //         if(response.status == 200){
    //            setAuthenticated(true)
    //            setUsername(username)
    //            setToken(baToken)
    //            apiClient.interceptors.request.use((config) => {
    //                 console.log('added')
    //                 config.headers.Authorization = baToken
    //                 return config
    //            })
    //            return true     
    //         } else {
    //             logout()
    //             return false  
    //         }
    //     } catch(error) {
    //         logout()
    //         return false 
    //     }
    // }

    async function login(username, password) {
        try {
            const response = await executeJwtAuthService(username, password)
    
            if(response.status == 200){
                const jwtToken = 'Bearer ' + response.data.token
                
               setAuthenticated(true)
               setUsername(username)
               setToken(jwtToken)
               apiClient.interceptors.request.use((config) => {
                    console.log('added')
                    config.headers.Authorization = jwtToken
                    return config
               })
               return true     
            } else {
                logout()
                return false  
            }
        } catch(error) {
            logout()
            return false 
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    ) 

}