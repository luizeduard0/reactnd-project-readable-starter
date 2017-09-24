import React from 'react'
import Avatar from 'react-avatar'
import './style.css'

const Comment = ({ comment }) => (
  <div className='post-comment'>
    <div className='post-comment-avatar'>
      <Avatar name={comment.author} size={40} round={true} />
    </div>
    <div className='post-comment-author'>{comment.author}</div>
    <div className='post-comment-body'>{comment.body}</div>
  </div>
)

export default Comment
