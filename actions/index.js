import { RETRIEVED_DECKS, STORED_DECK } from './types'

/**
 * Create a new decks retireved action
 * with the decks retrieved.
 *
 * @return {object}
 */
export function deckskRetrieved(decks) {
  return {
    type: RETRIEVED_DECKS,
    decks,
  }
}

/**
 * Create a new stored deck action
 * for the given deck object.
 *
 * @return {object}
 */
export function storedDeck(deck) {
  return {
    type: STORED_DECK,
    deck,
  }
}
