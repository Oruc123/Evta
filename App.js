import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Root } from 'native-base';
import NavigationService from './components/navigation/NavigationService';
import AppStack from './components/navigation/AppStack';
import AuthStack from './components/navigation/AuthStack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import Intro from './pages/Intro';
import { URL } from './components/basic/url';
import axios from 'axios';
var Smartlook = require('smartlook-react-native-wrapper');
var ls = require('react-native-local-storage');

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Intro,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    this.getTranslations();
    Smartlook.init("8023f1739baff1b1eb94328d57eb6757c53a8b86");
  }

  getTranslations = () => {
    axios.get(URL + 'api/dictionary').
      then(result =>
        ls.save('translations', result.data.translations)
      )
  }

  render() {

    return (
      <Container>
        <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
        <Root>
          <AppContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
        </Root>
      </Container>
    );
  }

}
