import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader'
import humanize from 'string-humanize'
import './style.css'

class PostForm extends Component {
  state = {
    name: 'Untitled',
    body: null,
    category: null
  }
  render() {
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
                value={post.title}
                className='form-control input-lg'
                placeholder="Title"
                onChange={(e) => this.setState({ name: e.target.value })}
               />
            </div>
            <div className='form-group'>
              <textarea
                name='body'
                className='form-control'
                placeholder="What do you want to say?"
                value={post.body}
                onChange={(e) => this.setState({ body: e.target.value })} />
            </div>
            <div className='form-group'>
              <select name="category" value={post.category} className='form-control'>
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
              <h2>{post.title || 'Untitled'}</h2>
              <p style={{marginTop: '30px'}}>
                {post.body || (
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
