/** @jsx h */
import { h, render } from 'preact'
import { Provider, Client } from '../../src/index'
import App from './app'

const client = Client({
  url: 'http://localhost:3001/graphql'
})

render((
  <Provider client={client}>
    <App />
  </Provider>
), document.body, document.body.lastChild)
