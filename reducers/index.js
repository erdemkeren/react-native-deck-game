import { RETRIEVED_DECKS, STORED_DECK } from '../actions/types'

const initialState = {
  decks: {},
}

/**
 * Apply the changes to the redux store.
 *
 * @return {object}
 */
function decks(state = initialState, action) {
  switch (action.type) {
    case RETRIEVED_DECKS:
      return {
        decks: action.decks,
      }
    case STORED_DECK:
      const { id, ...data } = action.deck

      return {
        decks: {
          ...state.decks,
          [id]: data,
        },
      }
  }

  return state
}

export default decks
