export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'

export function votePostUp(id) {
  return {
    type: UP_VOTE_POST,
    id
  }
}

export function votePostDown(id) {
  return {
    type: DOWN_VOTE_POST,
    id
  }
}
