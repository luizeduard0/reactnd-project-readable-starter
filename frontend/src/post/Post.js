import React, { Component } from 'react'
import * as PostApi from './../posts/api'
import Vote from './../vote/Vote'

class Post extends Component {
  state = {
    post: {}
  }
  componentWillMount() {
    PostApi.getPost(this.props.match.params.id)
      .then(post => {
        this.setState({
          post
        })
      })
  }
  render() {
    const { post } = this.state
    return (
      <div className='post'>
        <h2 className='post-title'>{post.title}</h2>
        <div class='post-body'>
          <Vote post={post} />
          {post.body}
        </div>
      </div>
    )
  }
}

export default Post
