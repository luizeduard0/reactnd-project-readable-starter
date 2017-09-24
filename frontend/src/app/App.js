import React, { Component } from 'react';
import CategoriesNav from './../categoriesNav/CategoriesNav'
import Posts from './../posts/Posts'
import { Route } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CategoriesNav />

        <Route exact path='/' render={() => (
          <Posts />
        )} />

        <Route path='/:category/posts' component={Posts} />

      </div>
    );
  }
}

export default App;
