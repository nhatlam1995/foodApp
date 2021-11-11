import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import MyTabs from './src/navigations'
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

const styles = StyleSheet.create({})
