import React from 'react'
import uuidv4 from 'uuid/v4'
import {
  Container,
  Content,
  Item,
  Form,
  Label,
  Input,
  Button,
  Text,
} from 'native-base'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { storedDeck } from '../actions'
import { osColor } from '../utils/color-selector'
import { storeDeck } from '../utils/storage-service'

class DeckForm extends React.Component {
  state = {
    id: null,
    title: '',
    cards: [],
    color: '#333',
  }
  static navigationOptions = {
    title: 'New Deck',
  }
  handleTitleChange = title => {
    this.setState({
      title: title,
    })
  }
  onSubmit = () => {
    const { dispatch, navigation } = this.props

    const deck = this.state
    deck.id = deck.id ? deck.id : uuidv4()
    deck.color = osColor(Platform.OS)

    storeDeck(deck).then(() => {
      dispatch(storedDeck(deck))

      navigation.navigate('DeckView', { deck: deck })
    })
  }
  render() {
    const { id, title } = this.state

    return (
      <Container>
        <Content>
          <Form>
            <Item last floatingLabel>
              <Label>What is the title of the deck?</Label>
              <Input
                name="title"
                onChangeText={title => this.handleTitleChange(title)}
              />
            </Item>
          </Form>
          <Button
            disabled={title === ''}
            block
            primary
            style={{
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
            }}
            onPress={this.onSubmit}
          >
            <Text>Create Deck</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect()(DeckForm)
