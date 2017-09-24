import React, { Component } from 'react'
import * as PostApi from './api'
import PostThread from './../postThread/PostThread'
import './style.css'

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    this.getPosts(this.props.category)
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
          <PostThread post={post} />
        ))}
      </div>
    )
  }
}

export default Posts
