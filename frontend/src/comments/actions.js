export const GET_COMMENTS    = 'GET_COMMENTS'
export const ADD_COMMENT    = 'ADD_COMMENT'
export const EDIT_COMMENT   = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT_UP   = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN   = 'VOTE_COMMENT_DOWN'

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment({ id, body, author, parentId, voteScore, timestamp }) {
  return {
    type: ADD_COMMENT,
    id,
    body,
    author,
    parentId,
    timestamp,
    voteScore
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

export function voteCommentUp(id) {
  return {
    type: VOTE_COMMENT_UP,
    id
  }
}

export function voteCommentDown(id) {
  return {
    type: VOTE_COMMENT_DOWN,
    id
  }
}
