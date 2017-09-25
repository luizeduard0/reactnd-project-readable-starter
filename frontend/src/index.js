import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose  } from 'redux'
import { Provider } from 'react-redux'
import App from './app/App'
import registerServiceWorker from './registerServiceWorker'
import logger from 'redux-logger'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(logger)
))

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, document.getElementById('root'))
registerServiceWorker();
