import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import { getPost, deletePost } from './../posts/actions'
import Vote from './../vote/Vote'
import ContentLoader from 'react-content-loader'
import Comments from './../comments/Comments'
import { notify } from './../notificationSystem/actions'
import { uuid } from './../utils/helpers'
import Moment from 'react-moment'
import './style.css'

class Post extends Component {
  state = {
    loadingPost: false,
    loadingComments: false,
    postingComment: false,
    post: {},
    comments: [],
    redirect: false
  }
  componentWillMount() {
    const postId = typeof this.props.match !== 'undefined' ? this.props.match.params.id : null
    if(postId) this.getPost(postId)
  }
  getPost = postId => {
    if(this.props.post.id) {
      return
    }
    this.setState({ loadingPost: true })
    PostApi.getPost(postId)
      .then(post => {
        this.setState({ loadingPost: false })
        this.props.dispatch(getPost(post))
      })
  }
  deletePost = id => {
    PostApi.deletePost(id)
      .then(response => {
        if(response.deleted) {
          this.props.dispatch(deletePost(id))
          this.props.dispatch(notify({
            id: uuid(),
            type: 'success',
            message: 'The post was deleted'
          }))
          this.setState({ redirect: '/' })
        }
      })
  }
  render() {
    const { comments, loadingPost, loadingComments, redirect } = this.state
    const { post } = this.props

    if(redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <div className='post-wrapper'>
        {loadingPost && (
          <div style={{maxWidth: '500px'}}>
            <ContentLoader type="list" />
          </div>
        ) || (
          post.id && (
            <div className='post'>
              <h2 className='post-title'>
                <button
                  onClick={() => this.deletePost(post.id)}
                  className='btn btn-danger pull-right'
                  style={{ background: 'transparent', color: '#d43f3a' }}>
                  <i className='glyphicon glyphicon-trash'></i> Delete
                </button>
                <Link to={`/post/${post.id}/edit`} className='btn btn-link pull-right' style={{ marginRight: '15px', borderRight: '1px solid #eee' }}>
                  <i className='glyphicon glyphicon-pencil'></i> Edit
                </Link>
                {post.title}
                <small className='post-author'>{post.author}</small>
              </h2>
              <div className='post-body'>
                <Vote
                  id={post.id}
                  score={post.voteScore}
                  type='post' />

                {post.body}

                <div className='post-date'>
                  Posted at <Moment format="DD/MM/YYYY">{post.timestamp}</Moment>
                </div>

                <Comments
                  post={post}
                  onPostComment={this.onPostComment}
                  comments={comments} />
              </div>
            </div>
          ) || (
            <div className='not-found-page'>
              <div className='jumbo'>Whoops</div>
              <h2>
                Page not found
                <small>404 &bull; Try using one of our categories above to find what you were looking for.</small>
              </h2>
            </div>
          )
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    post: posts && typeof posts[props.match.params.id] !== 'undefined' ? posts[props.match.params.id] : {}
  }
}

export default withRouter(connect(mapStateToProps)(Post))
