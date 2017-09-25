import { combineReducers } from 'redux'
import votes from './vote/reducer'
import posts from './posts/reducer'
import comments from './comment/reducer'

export default combineReducers({
  votes,
  posts,
  comments
})
