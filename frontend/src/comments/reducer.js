import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN
} from './actions'

export default function comments(state = {}, action) {
  const { id, body, author, parentId, timestamp, comments, voteScore } = action
  let newState = {}
  let newVoteScore = 0

  switch(action.type) {
    case GET_COMMENTS:
      newState = { ... state }
      comments.map(comment => {
        newState[comment.id] = comment
      })
      return newState
    case ADD_COMMENT:
      return {
        ...state,
        [id]: {
          id,
          body,
          author,
          parentId,
          voteScore
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          body
        }
      }
    case DELETE_COMMENT:
      newState = state
      delete newState[id]
      return newState

    case VOTE_COMMENT_UP:
      newVoteScore = state[id].voteScore + 1
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newVoteScore === 0 ? 1 : newVoteScore
        }
      }

    case VOTE_COMMENT_DOWN:
      newVoteScore = state[id].voteScore - 1
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newVoteScore === 0 ? -1 : newVoteScore
        }
      }
    default:
      return state
  }
}
