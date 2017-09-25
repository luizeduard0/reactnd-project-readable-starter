import { combineReducers } from 'redux'
import votes from './vote/reducer'
import posts from './posts/reducer'

export default combineReducers({
  votes,
  posts
})
