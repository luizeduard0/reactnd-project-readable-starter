import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST
} from './actions'

import {
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from './../vote/actions'

export default function posts(state = {}, action) {
  const { id, timestamp, title, body, author, category, voteScore }  = action
  let newState = {}
  let newVoteScore = null
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
    case DELETE_POST:
      newState = { ...state }
      delete newState[id]
      return newState
    case UP_VOTE_POST:
      newVoteScore = state[id].voteScore === -1 ? 1 : (state[id].voteScore + 1)
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newVoteScore
        }
      }
    case DOWN_VOTE_POST:
      newVoteScore = state[id].voteScore === 1 ? -1 : (state[id].voteScore - 1)
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newVoteScore
        }
      }
    default:
      return state
  }
}
