import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import OrderShowContainer from './containers/OrderShowContainer'
import configureStore from './store/configureStore'

import { ReduxRouter } from 'redux-router'
import { Route, Link } from 'react-router'
import { setCurrentOrder } from './containers/OrderShowContainer'

const store = configureStore()

render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/" component={App} />
      <Route path="/order/:sn" component={OrderShowContainer} />
    </ReduxRouter>
  </Provider>,
  document.getElementById('root')
)

