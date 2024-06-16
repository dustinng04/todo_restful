import axios from "axios"
import { apiClient } from "./ApiClient"

    
export const executeBasicAuthService =
    (token) => apiClient.get(`/basicauth`, {
        headers: {
            Authorization: token
        }
    })
    
export const executeJwtAuthService 
= (username, password) =>
    apiClient.post(`/authenticate`, {username, password})  