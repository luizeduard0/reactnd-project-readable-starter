import React, { Component } from 'react'
import * as PostApi from './api'
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
    this.getPosts(category)
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
      this.setState({
        posts
      })
    })
  }
  render() {
    const { posts } = this.state
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

export default Posts
