import React from 'react'
import Vote from './../vote/Vote'
import Avatar from 'react-avatar'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import './style.css'

const Comment = ({ comment, onEdit, onDelete }) => (
  <div className='post-comment'>
    <div className='post-comment-date'><Moment fromNow>{comment.timestamp}</Moment></div>
    <div className='post-comment-avatar'>
      <Avatar name={comment.author} size={40} round={true} />
    </div>
    <div className='post-comment-author'>{comment.author}</div>
    <div className='post-comment-body'>
      {comment.body}
      <Vote id={comment.id} type='comment' score={comment.voteScore} size='small' />
      <div className='post-comment-actions'>
        <button onClick={onEdit} className='post-comment-edit-btn'>Edit</button>
        <button onClick={onDelete} className='post-comment-delete-btn'>Delete</button>
      </div>
    </div>
  </div>
)

Comment.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Comment
