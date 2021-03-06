import { combineReducers } from 'redux'
import posts from './posts/reducer'
import comments from './comments/reducer'
import categories from './categoriesNav/reducer'
import notifications from './notificationSystem/reducer'

export default combineReducers({
  posts,
  comments,
  categories,
  notifications
})
