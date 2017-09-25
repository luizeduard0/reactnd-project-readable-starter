import { combineReducers } from 'redux'
import posts from './posts/reducer'
import comments from './comments/reducer'

export default combineReducers({
  posts,
  comments
})
