import React from 'react'
import Comment from './../comment/Comment'
import PropTypes from 'prop-types'
import './style.css'

const Comments = ({ post, comments = [], onPostComment }) => (
  <div className='post-comments'>
    <div className='new-comment'>
      <form onSubmit={onPostComment}>
        <input type="hidden" name='parentId' value={post.id} />
        <input
          type="text"
          name='author'
          placeholder="Type your name"
          autoComplete="off" />
        <input
          type="text"
          name='body'
          placeholder="Type your comment here"
          autoComplete="off" />
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

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array,
  onPostComment: PropTypes.func.isRequired
}

export default Comments
