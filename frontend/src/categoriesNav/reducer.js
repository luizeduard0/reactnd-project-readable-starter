import { GET_CATEGORIES } from './actions'

export default function categories(state = {}, action) {
  const { categories } = action
  let newCategories = {}
  switch(action.type) {
    case GET_CATEGORIES:
      categories.map(category => newCategories[category.name] = category)
      return newCategories
    default:
      return state
  }
}
