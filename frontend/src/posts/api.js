import { get } from './../utils/api'

export const getPosts = () => {
  return get(`/posts`)
}

export const getPostsByCategory = category => {
  return get(`/${category}/posts`)
}
