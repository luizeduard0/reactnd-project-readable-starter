import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import * as CommentApi from './../comments/api'
import PropTypes from 'prop-types'
import { votePostUp, votePostDown } from './actions'
import { voteCommentUp, voteCommentDown } from './../comments/actions'
import { notify } from './../notificationSystem/actions'
import { uuid } from './../utils/helpers'
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
      if(this.state.voted === 'downVote') {
        this.props.notify({
          id: uuid(),
          type: 'error',
          message: 'You already voted'
        })
        return
      }
      PostApi.vote(id, 'downVote')
        .then(res => {
          this.setState({voted: 'downVote'})
          this.props.votePostDown(id)
        })
      return
    }
    if(this.state.voted === 'upVote') {
      this.props.notify({
        id: uuid(),
        type: 'error',
        message: 'You already voted'
      })
      return
    }
    PostApi.vote(id, 'upVote')
      .then(res => {
        this.setState({voted: 'upVote'})
        this.props.votePostUp(id)
      })
  }
  commentVoteHandler(id, downVote) {
    if(downVote) {
      CommentApi.vote(id, 'downVote')
        .then(res => {
          this.props.voteCommentDown(id)
        })
      return
    }
    CommentApi.vote(id, 'upVote')
      .then(res => {
        this.props.voteCommentUp(id)
      })
  }
  render () {
    const { id, score, type, size } = this.props
    return (
      <div className={`vote-tool ${size}`}>
        <div className='vote-result'>
          <div className='to-vote'>
            <button
              onClick={() => this.onVote(id, true)}
              className={`vote-dislike-it ${score < 0 ? 'active' : ''}`}>
              <i className='glyphicon glyphicon-thumbs-down'></i>
              <span>{score < 0 && (score * (-1))}</span>
            </button>
            <button
              onClick={() => this.onVote(id)}
              className={`vote-like-it ${score >= 0 ? 'active' : ''}`}>
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

function mapDispatchToProps(dispatch) {
  return {
    notify: data => dispatch(notify(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    votePostUp: data => dispatch(votePostUp(data)),
    voteCommentUp: data => dispatch(voteCommentUp(data)),
    voteCommentDown: data => dispatch(voteCommentDown(data)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Vote))
