import React from 'react'
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
import { View } from 'react-native'
import { connect } from 'react-redux'
import { storedDeck } from '../actions'
import { storeDeck } from '../utils/storage-service'

class CardForm extends React.Component {
  state = {
    question: '',
    answer: '',
  }
  static navigationOptions = {
    title: 'New Card',
  }
  handleQuestionChange = question => {
    this.setState({
      question: question,
    })
  }
  handleAnswerChange = answer => {
    this.setState({
      answer: answer,
    })
  }
  onSubmit = () => {
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params
    const card = this.state

    deck.cards.push(card)

    storeDeck(deck).then(() => {
      dispatch(storedDeck(deck))

      navigation.goBack()
    })
  }
  render() {
    const { question, answer } = this.state
    const isValid = question !== '' && answer !== ''

    return (
      <Container>
        <Content>
          <Form>
            <Item first floatingLabel>
              <Label>What is the question</Label>
              <Input
                name="question"
                onChangeText={question => this.handleQuestionChange(question)}
              />
            </Item>

            <Item last floatingLabel>
              <Label>What is the answer of the question?</Label>
              <Input
                name="answer"
                onChangeText={answer => this.handleAnswerChange(answer)}
              />
            </Item>
          </Form>
          <Button
            disabled={!isValid}
            block
            primary
            style={{
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
            }}
            onPress={this.onSubmit}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect()(CardForm)
