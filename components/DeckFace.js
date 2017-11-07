import React from 'react'
import { Platform, View } from 'react-native'
import { Card, CardItem, Body, Right, Left, Button, Text } from 'native-base'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'

export default function DeckFace({ deck, isListView, onStartQuiz, onAddDeck }) {
  const { id, title, color, cards } = deck

  return (
    <Card>
      <CardItem cardBody>
        <Body
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name={Platform.OS === 'ios' ? 'cards-outline' : 'cards'}
              size={50}
              style={{ color: color }}
            />
            <Text
              style={{
                fontSize: 40,
                marginLeft: 10,
                color: '#333',
              }}
            >
              {title}
            </Text>
            {isListView && (
              <Entypo
                name="chevron-small-right"
                size={50}
                style={{ color: '#333' }}
              />
            )}
          </View>
        </Body>
      </CardItem>
      <CardItem>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: onAddDeck ? 'space-between' : 'flex-end',
          }}
        >
          {typeof onAddDeck !== 'undefined' && (
            <Left>
              <Button transparent onPress={onAddDeck}>
                <Text>
                  <MaterialCommunityIcons name="plus" />
                  &nbsp;Add Card
                </Text>
              </Button>
            </Left>
          )}
          {typeof onStartQuiz !== 'undefined' && (
            <Body>
              <Button transparent onPress={onStartQuiz}>
                <Text>
                  <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'}
                  />
                  &nbsp;Quiz Up
                </Text>
              </Button>
            </Body>
          )}
          <Right>
            <Text style={{ paddingRight: 30 }}>
              {cards.length === 0 ? 'No' : cards.length} Cards
            </Text>
          </Right>
        </View>
      </CardItem>
    </Card>
  )
}
