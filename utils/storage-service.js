import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, NOTIFICATION_KEY } from 'react-native-dotenv'

/**
 * Retrieve the decks from the storage.
 *
 * @return {promise}
 */
export function retrieveDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {
    if (data !== null) {
      return JSON.parse(data)
    }

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify((data = {})))

    return data
  })
}

/**
 * Store a deck in the storage.
 *
 * @return {promise}
 */
export function storeDeck({ id, ...data }) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({ [id]: data }),
  )
}

/**
 * Retrieve the local notification status from the storage.
 *
 * @return {promise}
 */
export function retrieveLocalNotificationStatus() {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
}

/**
 * Store the local notification status in the storage.
 *
 * @return {promise}
 */
export function storeLocalNotificationStatus(status) {
  return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}

/**
 * Remove the local notification status from the storage.
 *
 * @return {promise}
 */
export function removeLocalNotificationStatus() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
}
