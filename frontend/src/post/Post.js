import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import { getPost } from './../posts/actions'
import Vote from './../vote/Vote'
import ContentLoader from 'react-content-loader'
import Comments from './../comments/Comments'
import AlertContainer from 'react-alert'
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
        // this.setState({
        //   post,
        //   loadingPost: false
        // })
      })
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
    const { comments, loadingPost, loadingComments } = this.state
    const { post } = this.props
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
                <Vote id={post.id} score={post.voteScore} onVote={this.onVote} type='post' />
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

function mapStateToProps({ posts }, props) {
  return {
    post: posts && typeof posts[props.match.params.id] !== 'undefined' ? posts[props.match.params.id] : {}
  }
}

export default withRouter(connect(mapStateToProps)(Post))
