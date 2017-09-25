export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'

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
