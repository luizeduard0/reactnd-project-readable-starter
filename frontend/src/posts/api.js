import { get, post, put, deleteRequest } from './../utils/api'

export const getPosts = () => {
  return get(`/posts`)
}

export const getPostsByCategory = category => {
  return get(`/${category}/posts`)
}

export const getPost = id => {
  return get(`/posts/${id}`)
}

export const createPost = ({ id, title, body, author, category, timestamp }) => {
  return post(`/posts`, {
    id,
    title,
    body,
    author,
    category,
    timestamp
  })
  .then(res => res.json())
}

export const updatePost = ({ id, title, body }) => {
  return put(`/posts/${id}`, { title, body })
            .then(res => res.json())
}

export const deletePost = id => {
  return deleteRequest(`/posts/${id}`)
    .then(res => res.json())
}

export const getPostComment = id => {
  return get(`/posts/${id}/comments`)
}

export const vote = (id, option) => {
  return post(`/posts/${id}`, {  option })
}
