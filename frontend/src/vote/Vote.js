import React from 'react'
import './style.css'

const Vote = ({ post }) => (
  <div className='vote-tool'>
    <div className='vote-result'>

      <i className={post.voteScore >= 0 ? 'glyphicon glyphicon-thumbs-up' : 'glyphicon glyphicon-thumbs-down'}></i> {post.voteScore >= 0 ? post.voteScore : post.voteScore * -1}
      <div className='to-vote'>
        <button className={post.voteScore < 0 ? 'active vote-dislike-it' : ' vote-dislike-it'}>
          <i className='glyphicon glyphicon-thumbs-down'></i>
          <span>{post.voteScore < 0 && (post.voteScore * (-1))}</span>
        </button>
        <button className={post.voteScore > 0 ? 'active vote-like-it' : ' vote-like-it'}>
          <span>{post.voteScore > 0 && (post.voteScore)}</span>
          <i className='glyphicon glyphicon-thumbs-up'></i>
        </button>
      </div>
    </div>
  </div>
)

export default Vote
