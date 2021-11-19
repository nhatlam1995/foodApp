import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import Auth from './src/navigations/Auth'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Auth />
      </NavigationContainer>
    </Provider>
  )
}

export default App