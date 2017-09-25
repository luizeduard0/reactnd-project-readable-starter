import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from './actions'

export function comment(state = {}, action) {
  switch(action.type) {
    case ADD_COMMENT:
    const { id, body, author, parentId } = action
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
      const { id, body } = action
      return {
        ...state,
        [id]: {
          ...state[id]
          body
        }
      }
    case DELETE_COMMENT:
      const { id } = action
      const newState = state
      delete newState[id]
      return newState
    case VOTE_COMMENT:
    default:
      return state
  }
}
