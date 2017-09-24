import React, { Component } from 'react'
import './style.css'

class PostThread extends Component {
  render() {
    const { post } = this.props
    return (
      <div className='post-thread'>
        <h3 className='post-thread-title'>{ post.title }</h3>
        <small className='post-thread-author'>{ post.author }</small>
      </div>
    )
  }
}

export default PostThread
