import React from 'react'
import './style.css'

const Vote = props => (
  <div className='vote-tool'>
    <div className='vote-result'>
      {props.post.voteScore}
      <div className='to-vote'>
        <button className='vote-dislike-it'>-</button>
        <button className='vote-like-it'>+</button>
      </div>
    </div>
  </div>
)

export default Vote
