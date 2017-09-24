import React, { Component } from 'react'
import * as PostApi from './api'

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
    return (
      <div className='posts'>
        Posts...
      </div>
    )
  }
}

export default Posts
