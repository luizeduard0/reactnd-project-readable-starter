import { get, post } from './../utils/api'

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

export const getPostComment = id => {
  return get(`/posts/${id}/comments`)
}

export const vote = (id, option) => {
  return post(`/posts/${id}`, {  option })
}
