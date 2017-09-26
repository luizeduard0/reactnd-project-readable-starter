import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import * as CategoryApi from './api'
import { getCategories } from './actions'
import humanize from 'string-humanize'

class CategoriesNav extends Component {
  state = {
    categories: [],
    currentCategory: null
  }
  componentDidMount() {
    CategoryApi.getCategories()
      .then(response => {
        this.props.dispatch(getCategories(response.categories))
        // this.setState({
        //   categories: response.categories
        // })
      })
  }
  render() {
    const { currentCategory } = this.state
    const { categories } = this.props
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to='/' className='navbar-brand'>Readable</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={!currentCategory ? 'active' : null}><NavLink to={`/`} onClick={() => this.setState({ currentCategory: null })}>All</NavLink></li>
              {categories && categories.map(category => (
                <li key={category.name} className={category.name === currentCategory ? 'active' : null}>
                  <NavLink
                    to={`/${category.name}/posts`}
                    onClick={() => this.setState({ currentCategory: category.name })}>
                    {humanize(category.name)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(id => categories[id])
  }
}
export default connect(mapStateToProps)(CategoriesNav)
