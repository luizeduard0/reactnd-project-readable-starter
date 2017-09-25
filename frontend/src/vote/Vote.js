import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { voteUp, voteDown } from './actions'
import './style.css'

class Vote extends Component {
  onVote = (id, downVote = false) => {
    if(downVote) {
      this.props.dispatch(voteDown(id))
      return
    }
    this.props.dispatch(voteUp(id))
  }
  render () {
    const { id, score, type } = this.props
    return (
      <div className='vote-tool'>
        <div className='vote-result'>
          <i className={score >= 0 ? 'glyphicon glyphicon-thumbs-up' : 'glyphicon glyphicon-thumbs-down'}></i> {score >= 0 ? score : score * -1}
          <div className='to-vote'>
            <button
              onClick={() => this.onVote(id, true)}
              className={score < 0 ? 'active vote-dislike-it' : ' vote-dislike-it'}>
              <i className='glyphicon glyphicon-thumbs-down'></i>
              <span>{score < 0 && (score * (-1))}</span>
            </button>
            <button
              onClick={() => this.onVote(id)}
              className={score > 0 ? 'active vote-like-it' : ' vote-like-it'}>
              <span>{score > 0 && (score)}</span>
              <i className='glyphicon glyphicon-thumbs-up'></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Vote.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['post','comment']).isRequired,
  score: PropTypes.number.isRequired
}

export default withRouter(connect()(Vote))
