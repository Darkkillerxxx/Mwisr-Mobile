import React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import MainLayout from './Components/MainLayout'
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux'
import loginReducer from './store/Reducers/login'
import {AppLoading} from 'expo'
import * as Fonts from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import store from './store/store'


class App extends React.Component {
  
  constructor()
  {
    super()
    {
      this.state={
        hasLoaded:false
      }
    }
  }

 LoadFonts=()=>{
    Fonts.loadAsync({
     'open-sans':require('./assets/Fonts/Roboto-Light.ttf'),
     'open-sans-bold':require('./assets/Fonts/Roboto-Bold.ttf')
   }).then(() => {
      this.setState({hasLoaded:true},async ()=>{
        await SplashScreen.hideAsync()
      })
   })
 }

  componentDidMount=async ()=>{
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }

    this.LoadFonts()
  }


  render()
  {   
    if(!this.state.hasLoaded)
    {
      return null
    }

    return (
      <Provider store={store}>
          <MainLayout />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;