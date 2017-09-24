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

export const getPostComment = id => {
  return get(`/posts/${id}/comments`)
}

export const postComment = comment => {
  return post('/comments', comment)
}
