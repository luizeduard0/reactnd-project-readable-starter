import React, { Component } from 'react';
import CategoriesNav from './../categoriesNav/CategoriesNav'
import Posts from './../posts/Posts'
import Post from './../post/Post'
import PostForm from './../postForm/PostForm'
import NoMatch from './../nomatch/NoMatch'
import { Route, Switch } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <CategoriesNav />
        <div className='app-body'>
          <Switch>
            <Route exact path='/' component={Posts} />
            <Route exact path='/new-post' component={PostForm} />
            <Route exact path='/post/:id/edit' component={PostForm} />
            <Route path='/:category/posts' component={Posts} />
            <Route path='/:category/:id' component={Post} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
