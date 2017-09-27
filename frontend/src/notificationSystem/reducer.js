import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION
} from './actions'

export default function notifications(state={}, action) {
  const { id, messageType, message } = action
  let newState = {}
  switch(action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [id]: {
          id,
          type: messageType,
          message
        }
      }
    case DELETE_NOTIFICATION:
      newState = {...state}
      delete newState[id]
      return newState
    default:
      return state
  }
}
