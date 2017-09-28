import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PostApi from './api'
import { getPosts as getPostAction } from './actions'
import PostThread from './../postThread/PostThread'
import './style.css'

class Posts extends Component {

  state = {
    posts: [],
    sortBy: {
      "timestamp": null,
      "voteScore": "desc",
    }
  }

  componentDidMount() {
    let category = typeof this.props.match !== 'undefined' ? this.props.match.params.category : null
    this.getPosts(category)
  }
  componentWillReceiveProps(props) {
    let category = typeof props.match !== 'undefined' ? props.match.params.category : null
    if(this.props.match.params.category !== category) {
      this.getPosts(category)
    }
  }
  getPosts(category) {
    let response = null
    if(category) {
      response = PostApi.getPostsByCategory(category)
    } else {
      response = PostApi.getPosts()
    }

    if(!response) return

    response.then(posts => {
      this.props.dispatch(getPostAction(posts))
    })
  }
  sort = field => {
    let currentState = this.state.sortBy[field]
    let nextState = null
    let otherFields = Object.keys(this.state.sortBy)
                            .filter(f => f !== field)
                            .map(f => {
                              let obj = {}
                              obj[f] = null
                              return obj
                            })

    switch(currentState) {
      case 'asc':
        nextState = 'desc'
        break
      case 'desc':
        nextState = 'asc'
        break
      default:
        nextState = 'asc'
        break
    }

    let sortByState = { [field]: nextState }

    otherFields.map(field => {
      sortByState[field] = null
    })

    this.setState({ sortBy: sortByState })

  }
  getCurrentSortField = () => {
    return Object.keys(this.state.sortBy).filter(field => this.state.sortBy[field])
  }
  sortPosts = posts => {
    let currentSortField = this.getCurrentSortField()
    let currentSortValue = this.state.sortBy[currentSortField]

    return posts.sort((p1, p2) => {
      if(currentSortValue === 'asc') return p1[currentSortField] > p2[currentSortField]
      if(currentSortValue === 'desc') return p1[currentSortField] < p2[currentSortField]
      return true
    })
  }
  render() {
    const { posts } = this.props
    const { sortBy } = this.state
    return (
      <div>
        <Link
          to="/new-post"
          className='btn btn-primary pull-right' style={{ marginRight: '15px' }}>
          New Post
        </Link>
        <div className='clearfix'></div>
        <div className='posts'>
          <div className='toolbar'>
            <ul>
              <li>
                <button
                  onClick={() => this.sort('voteScore')}
                  className='btn btn-default btn-sm'>
                  {sortBy['voteScore'] && (
                    <i className={`glyphicon  ${sortBy['voteScore'] === 'asc' ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt'}`}></i>
                  )}
                  {' '}Vote Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => this.sort('timestamp')}
                  className='btn btn-default btn-sm'>
                  {sortBy['timestamp'] && (
                    <i className={`glyphicon  ${sortBy['timestamp'] === 'asc' ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt'}`}></i>
                  )}
                  {' '}Date
                </button>
              </li>
            </ul>
          </div>
          {posts && this.sortPosts(posts).map(post => (
            <PostThread key={post.id} post={post} />
          ))}
          {!posts.length && (
            <p>No posts to display</p>
          )}
        </div>
      </div>
    )
  }
}
function mapStateToProps({ posts }, props) {
  return {
    posts: Object.keys(posts).map(postId => posts[postId])
  }
}
export default withRouter(connect(mapStateToProps)(Posts))
