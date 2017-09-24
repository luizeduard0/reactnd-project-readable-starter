import React from 'react'
import './style.css'

const Vote = ({ post }) => (
  <div className='vote-tool'>
    <div className='vote-result'>
      {post.voteScore}
      <div className='to-vote'>
        <button className='vote-dislike-it'>-</button>
        <button className='vote-like-it'>+</button>
      </div>
    </div>
  </div>
)

export default Vote
