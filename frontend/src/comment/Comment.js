import React from 'react'
import Vote from './../vote/Vote'
import Avatar from 'react-avatar'
import Moment from 'react-moment'
import './style.css'

const Comment = ({ comment, getCommentDetail }) => (
  <div className='post-comment'>
    <div className='post-comment-date'><Moment fromNow>{comment.timestamp}</Moment></div>
    <div className='post-comment-avatar'>
      <Avatar name={comment.author} size={40} round={true} />
    </div>
    <div className='post-comment-author'>{comment.author}</div>
    <div className='post-comment-body' onClick={getCommentDetail}>
      {comment.body}
      <div style={{ marginLeft: '50px'  }}><Vote id={comment.id} type='comment' score={comment.voteScore} size='small' /></div>
    </div>
  </div>
)

export default Comment
