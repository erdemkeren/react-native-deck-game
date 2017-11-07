import React from 'react'
import DeckFace from './DeckFace'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { Platform, View, Text } from 'react-native'

class DeckView extends React.Component {
  render() {
    const { navigation } = this.props
    const { deck } = navigation.state.params

    return (
      <Container>
        <Content>
          <DeckFace
            deck={deck}
            onAddDeck={() => navigation.navigate('NewCard', { deck: deck })}
            onStartQuiz={() => navigation.navigate('QuizView', { deck: deck })}
          />
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    deck: Object.keys(state.decks).filter(
      (id) => (id === props.navigation.state.params.deckId)
    )
  }
}

export default connect(
  mapStateToProps
)(DeckView)
