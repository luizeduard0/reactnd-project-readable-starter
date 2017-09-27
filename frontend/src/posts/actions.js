export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

export function createPost({ id, timestamp, title, body, author, category, voteScore }) {
  return {
    type: CREATE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore
  }
}
