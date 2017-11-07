import React from 'react'
import { Animated } from 'react-native'
import {
  Container,
  Content,
  View,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Text,
  Button,
} from 'native-base'
import { EvilIcons } from '@expo/vector-icons'
import {
  scheduleLocalNotification,
  clearLocalNotification,
} from '../utils/local-notification-service'

/**
 * Get the question card component.
 *
 * @return {component}
 */
function UdaciCard({ card, totalCount, onViewAnswer }) {
  return (
    <Card style={{ elevation: 3 }}>
      <CardItem>
        <Left>
          <EvilIcons
            name={card.answerViewable ? 'eye' : 'question'}
            size={50}
          />
          <Body>
            <Text note>{card.question}</Text>
          </Body>
        </Left>
        <Right>
          <Text>{`${card.sequence}/${totalCount}`}</Text>
        </Right>
      </CardItem>
      <CardItem
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
        }}
      >
        {!card.answerViewable ? (
          <Button warning onPress={onViewAnswer}>
            <Text>Show Answer</Text>
          </Button>
        ) : (
          <Text>Answer: {card.answer}</Text>
        )}
      </CardItem>
    </Card>
  )
}

/**
 * Class QuizView.
 */
export default class QuizView extends React.Component {
  state = {
    cards: [],
    activeCard: null,
    showResults: false,
  }
  static navigationOptions = {
    title: 'Quiz',
  }
  componentDidMount() {
    const questions = this.prepareQuestions()

    this.setState({
      cards: questions,
      activeCard: questions.length !== 0 ? questions[0] : null,
    })

    clearLocalNotification().then(scheduleLocalNotification())
  }
  resetQuiz() {
    const questions = this.prepareQuestions()

    this.setState({
      cards: questions,
      activeCard: questions.length !== 0 ? questions[0] : null,
      showResults: false,
    })
  }
  prepareQuestions() {
    let i = 0

    return this.props.navigation.state.params.deck.cards.map((card, key) => {
      return {
        key: key,
        sequence: ++i,
        question: card.question,
        answer: card.answer,
        answerViewable: false,
        isCorrect: null,
      }
    })
  }
  onCorrectAnswer = card => {
    const { cards, activeCard } = this.state
    const nextCard = this.state.cards[++card.key]

    this.setState({
      cards: cards.map(c => {
        if (c.key === card.key) {
          c.isCorrect = true
        }

        return c
      }),
      activeCard: nextCard ? nextCard : null,
      showResults: nextCard ? false : true,
    })
  }
  onIncorrectAnswer(card) {
    const { cards, activeCard } = this.state
    const nextCard = this.state.cards[++card.key]

    this.setState({
      cards: this.state.cards.map(c => {
        if (c.key === card.key) {
          c.isCorrect = false
        }

        return c
      }),
      activeCard: nextCard ? nextCard : null,
      showResults: nextCard ? false : true,
    })
  }
  onViewAnswer = key => {
    this.setState({
      cards: this.state.cards.map(c => {
        if (c.key === key) {
          c.answerViewable = true
        }

        return c
      }),
    })
  }
  render() {
    const { navigation } = this.props
    const { activeCard, cards, showResults } = this.state
    const totalCount = cards.length
    const correctCount = cards.reduce(
      (i, card) => (card.isCorrect ? ++i : i),
      0,
    )
    const incorrectCount = cards.reduce(
      (i, card) => (card.isCorrect === false ? ++i : i),
      0,
    )
    const questionsLeft = totalCount - correctCount - incorrectCount

    {
      /** If there is no questions; just forget about it. **/
    }
    if (!totalCount) {
      return (
        <Container>
          <View>
            <Text>No questions in this deck.</Text>
          </View>
        </Container>
      )
    }

    return (
      <Container>
        <Content>
          {/** Show the active card to user. */}
          {activeCard && (
            <UdaciCard
              card={activeCard}
              totalCount={totalCount}
              onViewAnswer={() => this.onViewAnswer(activeCard.key)}
            />
          )}

          {/** If we have an active card, we show the buttons */}
          {!showResults && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button onPress={() => this.onIncorrectAnswer(activeCard)}>
                <Text>Incorrect</Text>
              </Button>
              <Button onPress={() => this.onCorrectAnswer(activeCard)}>
                <Text>Correct</Text>
              </Button>
            </View>
          )}

          {/** Finally, showing the results of the Quiz. */}
          {showResults && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text>Questions Asked: {totalCount}</Text>
              <Text>Correct Answers: {correctCount}</Text>
              <Text>Incorrect Answers: {incorrectCount}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button onPress={() => navigation.goBack()}>
                  <Text>Back to Deck</Text>
                </Button>
                <Button warn onPress={() => this.resetQuiz()}>
                  <Text>Restart Quiz</Text>
                </Button>
              </View>
            </View>
          )}
        </Content>
      </Container>
    )
  }
}
