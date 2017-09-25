import { post } from './../utils/api'

export const vote = (id, option) => {
  return post(`/comments/${id}`, { option })
}
