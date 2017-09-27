import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
} from './actions'

import {
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from './../vote/actions'

export default function posts(state = {}, action) {
  const { id, timestamp, title, body, author, category, voteScore }  = action
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
    case CREATE_POST:
      return {
        ...state,
        [id]: {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          voteScore
        }
      }
    case UP_VOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }
    case DOWN_VOTE_POST:
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
