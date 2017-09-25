import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import Vote from './../vote/Vote'
import ContentLoader from 'react-content-loader'
import Comments from './../comments/Comments'
import serializeForm from 'form-serialize'
import AlertContainer from 'react-alert'
import { uuid } from './../utils/helpers'
import './style.css'

class Post extends Component {
  state = {
    loadingPost: false,
    loadingComments: false,
    postingComment: false,
    post: {},
    comments: []
  }
  componentWillMount() {
    const postId = typeof this.props.match !== 'undefined' ? this.props.match.params.id : null
    if(postId) {
      this.getPost(postId)
      this.getPostComment(postId)
    }
  }
  getPost = postId => {
    if(this.props.posts[postId]) {
      this.setState({
        post: this.props.posts[postId]
      })
      return
    }
    this.setState({ loadingPost: true })
    PostApi.getPost(postId)
      .then(post => {
        this.setState({
          post,
          loadingPost: false
        })
      })
  }
  getPostComment = postId => {
    this.setState({ loadingComments: true })
    PostApi.getPostComment(postId)
      .then(comments => {
        this.setState({
          comments: comments.sort((c1, c2) => {
            return c1.timestamp < c2.timestamp
          }),
          loadingComments: true
        })
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
      timestamp: new Date().getTime()
    }

    this.setState({ postingComment: true })
    PostApi.postComment(comment)
      .then(response => {
        this.setState(state => {
          comments: state.comments.unshift(comment)
          postingComment: true
        })
      })


    e.target.author.value = ''
    e.target.body.value = ''
  }
  onVote = vote => {

  }
  showAlert = () => {
    this.msg.show('Some text or component', {
      time: 2000,
      type: 'success'
    })
  }
  render() {
    const { post, comments, loadingPost, loadingComments } = this.state
    return (
      <div className='post-wrapper'>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        {loadingPost && (
          <div style={{maxWidth: '500px'}}>
            <ContentLoader type="list" />
          </div>
        ) || (
          post.id && (
            <div className='post'>
              <h2 className='post-title'>
                {post.title}
                <small className='post-author'>{post.author}</small>
              </h2>
              <div className='post-body'>
                <Vote post={post} onVote={this.onVote} />
                {post.body}
                <Comments post={post} onPostComment={this.onPostComment} comments={comments} />
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

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps)(Post))
