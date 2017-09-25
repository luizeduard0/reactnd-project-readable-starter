import {
  GET_POSTS
} from './actions'

export default function posts(state = {}, action) {
  switch(action.type) {
    case GET_POSTS:
      posts = {}
      action.posts.map(post => {
        posts[post.id] = post
      })
      return posts
    default:
      return state
  }
}
