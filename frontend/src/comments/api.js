import { get, post, put, deleteRequest } from './../utils/api'

export const postComment = comment => {
  return post('/comments', comment)
}

export const vote = (id, option) => {
  return post(`/comments/${id}`, { option })
}

export const getCommentDetail = id =>{
  return get(`/comments/${id}`)
}

export const editComment = ({id, body}) => {
  return put(`/comments/${id}`, { id, body })
         .then(res => res.json())
}

export const deleteComment = id => {
  return deleteRequest(`/comments/${id}`)
         .then(res => res.json())
}
