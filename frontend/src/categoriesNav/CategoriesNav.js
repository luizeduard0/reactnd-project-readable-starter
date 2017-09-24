import React, { Component } from 'react'
import * as CategoryApi from './api'

class CategoriesNav extends Component {
  state = {
    categories: []
  }
  componentDidMount() {
    CategoryApi.getCategories()
      .then(response => {
        this.setState({
          categories: response.categories
        })
      })
  }
  render() {
    const { categories } = this.state
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
            <a className="navbar-brand" href="#">Readable</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {categories && categories.map(category => (
                <li key={category.name}><a href="#">{category.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default CategoriesNav
