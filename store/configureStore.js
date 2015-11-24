import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

import { reduxReactRouter } from 'redux-router'
import { Route } from 'react-router'
import { createHistory } from 'history'

const createStoreWithMiddleware = compose(
    applyMiddleware( thunkMiddleware, createLogger() ),
    reduxReactRouter({ createHistory })) (createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
