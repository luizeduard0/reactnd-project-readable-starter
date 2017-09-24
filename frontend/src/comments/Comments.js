import React from 'react'
import Comment from './../comment/Comment'
import './style.css'

const Comments = ({ comments = [] }) => (
  <div className='post-comments'>
    {comments.length && (
      comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))
    ) || (
      <p className='no-comments'>No comments yet, be the first to comment.</p>
    )}
  </div>
)

export default Comments
