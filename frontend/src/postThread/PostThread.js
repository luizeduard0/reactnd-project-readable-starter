import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as PostApi from './../posts/api'
import { deletePost } from './../posts/actions'
import { notify } from './../notificationSystem/actions'
import { uuid } from './../utils/helpers'
import Vote from './../vote/Vote'
import Moment from 'react-moment'
import './style.css'

class PostThread extends Component {
  deletePost = id => {
    PostApi.deletePost(id)
      .then(response => {
        if(response.deleted) {
          this.props.dispatch(deletePost(id))
          this.props.dispatch(notify({
            id: uuid(),
            type: 'success',
            message: 'The post was deleted'
          }))
        }
      })
    }
  render() {
    const { post } = this.props
    return (
      <div className='post-thread'>
        <div className='post-thread-actions'>
          <Vote id={post.id} score={post.voteScore} type='post' />
          <Link to={`/post/${post.id}/edit`} className='btn btn-link editPost' style={{ marginRight: '15px', borderRight: '1px solid #eee' }}>
            <i className='glyphicon glyphicon-pencil'></i> Edit
          </Link>
          <button
            onClick={() => this.deletePost(post.id)}
            className='btn btn-danger deletePost'
            style={{ background: 'transparent', color: '#d43f3a' }}>
            <i className='glyphicon glyphicon-trash'></i> Delete
          </button>
        </div>
        <Link to={`/${post.category}/${post.id}`}>
          <h3 className='post-thread-title'>{ post.title }</h3>
          <small className='post-thread-author'>{ post.author }</small>
          <small className='post-thread-date'> &bull; <Moment fromNow>{post.timestamp }</Moment></small>
        </Link>
      </div>
    )
  }
}

export default connect()(PostThread)
