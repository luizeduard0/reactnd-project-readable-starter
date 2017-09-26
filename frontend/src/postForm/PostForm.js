import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostApi from './../posts/api'
import { getPost } from './../posts/actions'
import ContentLoader from 'react-content-loader'
import humanize from 'string-humanize'
import './style.css'

class PostForm extends Component {
  state = {
    loadingPost: false,
    title: 'Untitled',
    body: null,
    category: null
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
          title: post.title,
          body: post.body,
          category: post.category,
        })
        this.props.dispatch(getPost(post))
      })
  }
  render() {
    const { title, body, category } = this.state
    const { post = {}, categories } = this.props
    return (
      <div className='post-form'>
        <div className='row'>
          <div className='col-md-5'>
            <h2>Create or Update</h2>
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
              <select name="category" value={category} className='form-control'>
                <option disabled>Choose the category</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>{humanize(category.name)}</option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <button className='btn btn-success'>Save or Update Post</button>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='preview-box'>
              <label className='label label-info pull-right'>PREVIEW</label>
              <h2>{title || 'Untitled'}</h2>
              <p style={{marginTop: '30px'}}>
                {body || (
                  <div>
                    <small className='preview-tip'>Type on the left to see the preview</small>
                    <ContentLoader type="list" />
                  </div>
                )}
              </p>
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
