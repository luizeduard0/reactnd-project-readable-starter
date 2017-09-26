import React, { Component } from 'react'
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
    return (
      <div className='post-form'>
        <div className='row'>
          <div className='col-md-5'>
            <h2>Create or Update</h2>
            <div className='form-group'>
              <input
                type="text"
                name='title'
                value={this.state.name}
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
                onChange={(e) => this.setState({ body: e.target.value })}></textarea>
            </div>
            <div className='form-group'>
              <select className='form-control'>
                <option disabled>Choose the category</option>
                <option>{humanize('react')}</option>
                <option>{humanize('redux')}</option>
                <option>{humanize('udacity')}</option>
              </select>
            </div>
            <div className='form-group'>
              <button className='btn btn-success'>Save or Update Post</button>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='preview-box'>
              <label className='label label-info pull-right'>PREVIEW</label>
              <h2>{this.state.name || ';a'}</h2>
              <p style={{marginTop: '30px'}}>
                {this.state.body || (
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

export default PostForm
