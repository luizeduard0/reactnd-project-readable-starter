export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'

export function voteUp(id) {
  return {
    type: UP_VOTE,
    id
  }
}

export function voteDown(id) {
  return {
    type: DOWN_VOTE,
    id
  }
}
