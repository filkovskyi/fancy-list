import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const configureStore = initialState => {
  const middleware = [sagaMiddleware]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  sagaMiddleware.run(rootSaga)
  return store
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
)
