import { uuid } from './helpers'

export const API_URL = process.env.API_URL || 'http://localhost:3001'

let token = localStorage.token
if (!token) token = localStorage.token = uuid().toString(36).substr(-8)

export const headers = { headers: { 'Authorization': token } }

export const get = url => {
  return fetch(`${API_URL}${url}`, headers).then(res => res.json())
}

export const post = (url, params) => {
  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: params ? JSON.stringify(params) : {},
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const deleteRequest = (url, params) => {
  return fetch(`${API_URL}${url}`, {
    method: 'DELETE',
    body: params ? JSON.stringify(params) : {},
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const put = (url, params) => {
  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    body: params ? JSON.stringify(params) : {},
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
