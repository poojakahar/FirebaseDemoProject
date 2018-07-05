/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import { RegistrationForm } from './src/components/Registration';
import  RegistrationForm  from './src/components/Registration/RegistrationForm';
import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import AppReducer from "./src/Reducer/index";


export default class App extends Component {
  render() {
    return (
      <Provider store={(createStore(AppReducer,applyMiddleware(thunk)))}>
        <RegistrationForm/>
      </Provider>
    );
  }
}