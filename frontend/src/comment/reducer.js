import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from './actions'

export default function comments(state = {}, action) {
  const { id, body, author, parentId } = action
  switch(action.type) {
    case GET_COMMENTS:
      return state
    case ADD_COMMENT:
      return {
        ...state,
        [id]: {
          id,
          body,
          author,
          parentId
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
      const newState = state
      delete newState[id]
      return newState
    case VOTE_COMMENT:
    default:
      return state
  }
}
