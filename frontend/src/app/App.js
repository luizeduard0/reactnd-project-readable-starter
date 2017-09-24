import React, { Component } from 'react';
import CategoriesNav from './../categoriesNav/CategoriesNav'
import Posts from './../posts/Posts'
import Post from './../post/Post'
import { Route } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <CategoriesNav />

        <div className='app-body'>
          <Route exact path='/' component={Posts} />
          <Route path='/:category/posts' component={Posts} />
          <Route path='/posts/:id' component={Post} />
        </div>

      </div>
    );
  }
}

export default App;
