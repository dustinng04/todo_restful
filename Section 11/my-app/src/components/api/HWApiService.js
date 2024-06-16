import { apiClient } from "./ApiClient"

export function retriveHelloWorldApi() {
    apiClient.get('/hello-world')
}

export const helloWorldPath = 
    (username, token) => apiClient.get(`/path-variable/${username}`, {
        headers: {
            Authorization: token
        }
    })

    
export const executeBasicAuthService =
    (token) => apiClient.get(`/basicauth`, {
        headers: {
            Authorization: token
        }
    })  
