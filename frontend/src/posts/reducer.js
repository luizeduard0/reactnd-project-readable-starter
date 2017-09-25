import {
  GET_POSTS,
  GET_POST,
} from './actions'

import {
  UP_VOTE,
  DOWN_VOTE
} from './../vote/actions'

export default function posts(state = {}, action) {
  const { id }  = action
  switch(action.type) {
    case GET_POSTS:
      posts = {}
      action.posts.map(post => {
        posts[post.id] = post
      })
      return posts
    case GET_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case UP_VOTE:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }
    case DOWN_VOTE:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore - 1
        }
      }
    default:
      return state
  }
}
