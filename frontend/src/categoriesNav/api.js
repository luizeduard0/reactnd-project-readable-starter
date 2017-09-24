import { get } from './../utils/api'

export const getCategories = () => {
  return get('/categories')
}
