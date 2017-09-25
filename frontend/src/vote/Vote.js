import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './style.css'

const Vote = ({ id, score, onVote }) => (
  <div className='vote-tool'>
    <div className='vote-result'>
      <i className={score >= 0 ? 'glyphicon glyphicon-thumbs-up' : 'glyphicon glyphicon-thumbs-down'}></i> {score >= 0 ? score : score * -1}
      <div className='to-vote'>
        <button
          onClick={onVote}
          className={score < 0 ? 'active vote-dislike-it' : ' vote-dislike-it'}>
          <i className='glyphicon glyphicon-thumbs-down'></i>
          <span>{score < 0 && (score * (-1))}</span>
        </button>
        <button
          onClick={onVote}
          className={score > 0 ? 'active vote-like-it' : ' vote-like-it'}>
          <span>{score > 0 && (score)}</span>
          <i className='glyphicon glyphicon-thumbs-up'></i>
        </button>
      </div>
    </div>
  </div>
)

Vote.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
}

export default Vote
