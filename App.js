import Expo from "expo"
import React from 'react'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import DeckForm from './components/DeckForm'
import DeckView from './components/DeckView'
import CardForm from './components/CardForm'
import QuizView from './components/QuizView'
import { StackNavigator } from 'react-navigation'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { scheduleLocalNotification } from './utils/local-notification-service'

const store = createStore(reducer)

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
  },
  NewDeck: {
    screen: DeckForm,
  },
  NewCard: {
    screen: CardForm,
  },
  DeckView: {
    screen: DeckView,
  },
  QuizView: {
    screen: QuizView,
  }
}, {
  navigationOptions: {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0
    }
  }
})

export default class App extends React.Component {
  state = {
    isReady: false
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  componentDidMount() {
    scheduleLocalNotification()
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
