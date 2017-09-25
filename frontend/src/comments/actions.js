export const GET_COMMENTS    = 'GET_COMMENTS'
export const ADD_COMMENT    = 'ADD_COMMENT'
export const EDIT_COMMENT   = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT   = 'VOTE_COMMENT'

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment({ id, body, author, parentId }) {
  return {
    type: ADD_COMMENT,
    id,
    body,
    author,
    parentId
  }
}

export function editComment(id, body) {
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function voteComment(id) {
  return {
    type: VOTE_COMMENT,
    id
  }
}
