import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import * as CommentApi from './../comments/api'
import { addComment, getComments, editComment, deleteComment } from './actions'
import Comment from './../comment/Comment'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { uuid } from './../utils/helpers'
import AlertContainer from 'react-alert'
import { notify } from './../notificationSystem/actions'
import './style.css'

class Comments extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  }

  componentWillMount() {
    this.getPostComment(this.props.post.id)
  }

  getPostComment = postId => {
    this.setState({ loadingComments: true })
    PostApi.getPostComment(postId)
      .then(comments => {
        this.setState({ loadingComments: false })
        this.props.getComments(comments)
      })
  }

  onPostComment = e => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if(!values.author) {
      this.msg.error('You need to provide your name to place a comment')
      return
    }

    if(!values.body) {
      this.msg.error('You can\'t create a blank comment')
      return
    }

    const comment = {
      id: uuid(),
      parentId: values.parentId,
      author: values.author,
      body: values.body,
      timestamp: new Date().getTime(),
      voteScore: 1
    }

    this.setState({ postingComment: true })
    CommentApi.postComment(comment)
      .then(response => {
        this.props.addComment(comment)
        this.setState({ postingComment: false })
      })

    e.target.author.value = ''
    e.target.body.value = ''
  }
  handleCommentEdit = ({id, body}) => {
  }
  handleCommentDelete = id => {
    CommentApi.deleteComment(id)
      .then(response => {
        if(response.id) {
          this.props.deleteComment(id)
          this.props.notify({
            id: uuid(),
            type: 'success',
            message: 'The comment has been deleted'
          })
        }
      })
  }
  render() {

    const { post, comments = [] } = this.props

    return (
      <div className='post-comments'>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className='new-comment'>
          <form onSubmit={this.onPostComment}>
            <input type="hidden" name='parentId' value={post.id} />
            <input
              type="text"
              name='author'
              placeholder="Your name"
              autoComplete="off" />
              <input
                type="text"
                name='body'
                placeholder="Type your comment and press enter"
                autoComplete="off" />
                <button type="submit" style={{ display: 'none' }}></button>
              </form>
            </div>
            <div className='comments-balance'>
              {comments.length === 1 ? `1 comment` : `${comments.length} comments`}
              {' '}
              <i className='glyphicon glyphicon-comment'></i>
            </div>
            {comments.length && (
              comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onEdit={() => this.handleCommentEdit(comment)}
                  onDelete={() => this.handleCommentDelete(comment.id)} />
              ))
            ) || (
              <p className='no-comments'>No comments yet, be the first to comment.</p>
            )}
        </div>
      )
  }
}

function mapStateToProps({ comments }, props) {
  return {
    comments: Object.keys(comments)
                    .map(commentId => comments[commentId])
                    .filter(comment => comment.parentId === props.post.id)
                    .sort((c1, c2) => c1.voteScore < c2.voteScore)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: data => dispatch(getComments(data)),
    addComment: data => dispatch(addComment(data)),
    deleteComment: data => dispatch(deleteComment(data)),
    notify: data => dispatch(notify(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
