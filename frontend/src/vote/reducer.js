import {
  UP_VOTE,
  DOWN_VOTE
} from './actions'

function vote(state={}, action) {
  const { id } = action
  switch(action) {
    case UP_VOTE:
      return {
        ...state,
        [id]: state[id] ? state[id]+1 : 1
      }
    case DOWN_VOTE:
      return {
        ...state,
        [id]: state[id] ? state[id]-1 : -1
      }
    default:
      return state
  }
}

export default vote
