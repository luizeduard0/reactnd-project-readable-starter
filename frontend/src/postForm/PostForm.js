import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import { getPost, createPost, updatePost } from './../posts/actions'
import ContentLoader from 'react-content-loader'
import humanize from 'string-humanize'
import serializeForm from 'form-serialize'
import { uuid } from './../utils/helpers'
import AlertContainer from 'react-alert'
import { notify } from './../notificationSystem/actions'
import './../post/style.css'
import './style.css'

class PostForm extends Component {
  state = {
    loadingPost: false,
    id: '',
    title: 'Untitled',
    body: '',
    category: '',
    author: '',
    redirect: false,
  }
  componentWillMount() {
    const postId = typeof this.props.match !== 'undefined' ? this.props.match.params.id : null
    if(postId) this.getPost(postId)
  }
  getPost = postId => {
    this.setState({ loadingPost: true })
    PostApi.getPost(postId)
      .then(post => {
        this.setState({
          loadingPost: false,
          id: post.id,
          title: post.title,
          body: post.body,
          category: post.category,
          author: post.author,
        })
        this.props.dispatch(getPost(post))
      })
  }
  handleCreateOrUpdatePost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    const { id, title, body, author, category } = values

    if(!title) {
      this.msg.error('You need to name your post.')
      return
    }

    if(!body) {
      this.msg.error('You can\'t post a blank page (:')
      return
    }

    if(!author) {
      this.msg.error('You need to inform the author')
      return
    }

    if(!category) {
      this.msg.error('You need to inform a category')
      return
    }

    const post = {
      id: id ? id : uuid(),
      title,
      body,
      author,
      category,
      timestamp: new Date().getTime(),
      voteScore: 0
    }

    if(id) {
      PostApi.updatePost({ id, title, body })
        .then(response => {
          console.log('RESPONSE', response)
          if(response.id) {
            this.props.dispatch(updatePost({ id, title, body }))
            this.props.dispatch(notify({
              id: uuid(),
              type: 'success',
              message: `The post has been updated`
            }))
            this.setState({ redirect: `/post/${id}` })
          }
        })
      return
    }
    PostApi.createPost(post)
      .then(response => {
        if(response.id) {
          this.props.dispatch(createPost(response))
          this.props.dispatch(notify({
            id: uuid(),
            type: 'success',
            message: `The post was created on ${post.category}`
          }))
          this.setState({ redirect: `/${post.category}/${post.id}` })
        }
      })

  }
  render() {
    const { id, title, body, category, author, redirect } = this.state
    const { post = {}, categories } = this.props

    if(redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <div className='post-form'>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className='row'>
          <div className='col-md-5'>
            <h2>Create or Update</h2>
            <form onSubmit={this.handleCreateOrUpdatePost}>
              <input
                type="hidden" name="id" value={id}
                onChange={(e) => this.setState({ id: e.target.value })} />
              <div className='form-group'>
                <input
                  type="text"
                  name='title'
                  value={title}
                  className='form-control input-lg'
                  placeholder="Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                 />
              </div>
              <div className='form-group'>
                <textarea
                  name='body'
                  className='form-control'
                  placeholder="What do you want to say?"
                  value={body}
                  onChange={(e) => this.setState({ body: e.target.value })} />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  name='author'
                  value={author}
                  className='form-control'
                  placeholder="Author"
                  onChange={(e) => this.setState({ author: e.target.value })}
                 />
              </div>
              <div className='form-group'>
                <select
                  name="category"
                  value={category}
                  className='form-control'
                  onChange={(e) => this.setState({ category: e.target.value })}>
                  <option value='' disabled>Choose the category</option>
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>{humanize(category.name)}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <button type="submit" className='btn btn-success'>Save or Update Post</button>
              </div>
            </form>
          </div>
          <div className='col-md-7'>
            <div className='preview-box'>
              <label className='label label-info pull-right'>PREVIEW</label>
              <div className='post'>
                <h2 className='post-title'>
                  {title || 'Untitled'}
                  <small className='post-author'>{author || 'by an unknown Author'}</small>
                </h2>
                <div className='post-body' style={{marginTop: '30px'}}>
                  {body || (
                    <div>
                      <small className='preview-tip'>Type on the left to see the preview</small>
                      <ContentLoader type="list" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ categories, posts }, props) {
  return {
    categories: Object.keys(categories).map(id => categories[id]),
    post: Object.keys(posts)
                .map(postId => posts[postId])
                .filter(post => post.id === props.match.params.id)[0]
  }
}
export default connect(mapStateToProps)(PostForm)
