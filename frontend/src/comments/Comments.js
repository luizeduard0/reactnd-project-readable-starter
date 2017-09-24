import React from 'react'
import Comment from './../comment/Comment'
import './style.css'

const Comments = ({ comments = [], onPostComment }) => (
  <div className='post-comments'>
    <div className='new-comment'>
      <form onSubmit={onPostComment}>
        <input
          type="text"
          placeholder="Type your comment here" />
          <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </div>
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
