export const API_URL = process.env.API_URL || 'http://localhost:3001'

let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = { headers: { 'Authorization': token } }

export const get = url => {
  return fetch(`${API_URL}${url}`, headers).then(res => res.json())
}
