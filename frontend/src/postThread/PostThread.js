import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Vote from './../vote/Vote'
import './style.css'

class PostThread extends Component {
  render() {
    const { post } = this.props
    return (
      <div className='post-thread'>
        <Vote id={post.id} score={post.voteScore} type='post' />
        <Link to={`/${post.category}/${post.id}`}>
          <h3 className='post-thread-title'>{ post.title }</h3>
          <small className='post-thread-author'>{ post.author }</small>
        </Link>
      </div>
    )
  }
}

export default PostThread
