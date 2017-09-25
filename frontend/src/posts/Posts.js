import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './api'
import { getPosts as getPostAction } from './actions'
import PostThread from './../postThread/PostThread'
import './style.css'

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    let category = typeof this.props.match !== 'undefined' ? this.props.match.params.category : null
    this.getPosts(category)
  }
  componentWillReceiveProps(props) {
    let category = typeof props.match !== 'undefined' ? props.match.params.category : null
    if(this.props.match.params.category !== category) {
      this.getPosts(category)
    }
  }
  getPosts(category) {
    let response = null
    if(category) {
      response = PostApi.getPostsByCategory(category)
    } else {
      response = PostApi.getPosts()
    }

    if(!response) return

    response.then(posts => {
      this.props.dispatch(getPostAction(posts))
    })
  }
  render() {
    const { posts } = this.props
    return (
      <div className='posts'>
        {posts && posts.map(post => (
          <PostThread key={post.id} post={post} />
        ))}
        {!posts.length && (
          <p>No posts to display</p>
        )}
      </div>
    )
  }
}
function mapStateToProps({ posts }) {
  return {
    posts: Object.keys(posts).map(postId => posts[postId])
  }
}
export default withRouter(connect(mapStateToProps)(Posts))
