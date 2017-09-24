import React, { Component } from 'react';
import CategoriesNav from './../categoriesNav/CategoriesNav'
import Posts from './../posts/Posts'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CategoriesNav />
        <Posts />
      </div>
    );
  }
}

export default App;
