import React from 'react'
import VisualRoot from './VisualRoot'
import { Provider } from 'mobx-react'
import SessionStore from '../Stores/SessionStore'

const session = new SessionStore()

const App = () => (
  <Provider session={session}>
    <VisualRoot />
  </Provider>
)

export default App
