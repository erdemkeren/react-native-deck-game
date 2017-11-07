import React from 'react'
import uuidv4 from 'uuid'
import DeckFace from './DeckFace'
import { connect } from 'react-redux'
import { deckskRetrieved } from '../actions'
import { Container, Content, Fab } from 'native-base'
import { retrieveDecks } from '../utils/storage-service'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Platform, TouchableOpacity, View, Text } from 'react-native'

/**
 * Get the ios new deck button component.
 *
 * @return {component}
 */
function IosNewDeckButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="plus"
        size={30}
        style={styles.rightNavBtn}
      />
    </TouchableOpacity>
  )
}

/**
 * Get the android new deck fab component.
 *
 * @return {component}
 */
function AndroidNewDeckFab ({ onPress }) {
  return (
    <Fab
      active={true}
      direction="up"
      containerStyle={{ }}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
      onPress={onPress}>
        <MaterialCommunityIcons name="plus" />
    </Fab>
  )
}

/**
 * Get the reviewer greeting view.
 *
 * @return {component}
 */
function ReviewerGreeting() {
  return (
    <View style={styles.center}>
      <MaterialCommunityIcons
        name='human-greeting'
        size={80}
      />
      <Text>Hello Reviewer!</Text>
      <Text>Create a deck to start!</Text>
    </View>
  )
}

class DeckList extends React.Component
{
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Decks',
      headerRight: (
        Platform.OS === 'ios' &&
            <IosNewDeckButton onPress={() => navigation.navigate('NewDeck')} />
      )
    }
  }
  componentDidMount () {
    const { dispatch } = this.props

    retrieveDecks().then(decks => dispatch(deckskRetrieved(decks)))
  }
  render() {
    const { decks, navigation } = this.props

    if(decks.length === 0) {
      return (
        <View style={styles.center}>
          <ReviewerGreeting />
          
          {Platform.OS === 'android' &&
                <AndroidNewDeckFab
                  onPress={() => {navigation.navigate('NewDeck')}}
                />}
        </View>
      )
    }

    return (
      <Container>
        <Content>
          {decks.map((deck) => (
            <TouchableOpacity
              key={deck.id}
              onPress={() => navigation.navigate('DeckView', {deck: deck})}
            >
              <DeckFace deck={deck} isListView={true} />
            </TouchableOpacity>

          ))}
        </Content>
        {Platform.OS === 'android' &&
              <AndroidNewDeckFab
                onPress={() => {navigation.navigate('NewDeck')}}
              />}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightNavBtn: {
    color: '#007AFF',
    paddingRight: 10
  }
})

function mapStateToProps(state) {
  return {
    decks: Object.keys(state.decks).reduce((container, key) => {
      const deck = state.decks[key]
      deck.id = key
      container.push(deck)

      return container
    }, [])
  }
}

export default connect(
  mapStateToProps
)(DeckList)
