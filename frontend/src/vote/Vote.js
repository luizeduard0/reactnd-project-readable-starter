import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import PropTypes from 'prop-types'
import { votePostUp, votePostDown } from './actions'
import './style.css'

class Vote extends Component {
  state = {
    voted: false,
  }
  onVote = (id, downVote = false) => {
    if(this.props.type === 'post') {
      this.postVoteHandler(id, downVote)
      return
    }
    if(this.props.type === 'comment') {
      this.commentVoteHandler(id, downVote)
      return
    }
  }
  postVoteHandler(id, downVote) {
    if(downVote) {
      if(this.state.voted === 'downVote') return
      PostApi.vote(id, 'downVote')
        .then(res => {
          this.setState({voted: 'downVote'})
          this.props.dispatch(votePostDown(id))
        })
      return
    }
    if(this.state.voted === 'upVote') return
    PostApi.vote(id, 'upVote')
      .then(res => {
        this.setState({voted: 'upVote'})
        this.props.dispatch(votePostUp(id))
      })
  }
  commentVoteHandler(id, downVote) {
    if(downVote) {
      return
    }
  }
  render () {
    const { id, score, type, size } = this.props
    return (
      <div className={`vote-tool ${size}`}>
        <div className='vote-result'>
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
  score: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small'])
}

export default withRouter(connect()(Vote))
