import {
  retrieveLocalNotificationStatus,
  storeLocalNotificationStatus,
  removeLocalNotificationStatus
 } from './storage-service'
import { Notifications, Permissions } from 'expo'

/**
 * Schedule the local notification.
 *
 * @return {promise}
 */
 export function scheduleLocalNotification () {
   retrieveLocalNotificationStatus().then((data) => {
     const permissionExists = data !== null
     if(! permissionExists) {
       _askForNotificationPermissions().then(({status}) => {
         if(status === 'granted') {
           Notifications.cancelAllScheduledNotificationsAsync()
           Notifications.scheduleLocalNotificationAsync(
             _makeNotification(), {
               time: _getNextNotificationDate(),
               repeat: 'day',
             }
           )

           storeLocalNotificationStatus(true)
         }
       })
     }
   })
 }

 /**
  * Clear the scheduled local notification.
  *
  * @return {promise}
  */
 export function clearLocalNotification () {
   return removeLocalNotificationStatus().then(
     Notifications.cancelAllScheduledNotificationsAsync
   )
 }

 /**
  * Determine if the application has permissions for notifications or not.
  *
  * @return {promise}
  */
function _askForNotificationPermissions() {
   return Permissions.askAsync(Permissions.NOTIFICATIONS)
 }

 /**
  * Get the next notiication date.
  *
  * @return {Date}
  */
function _getNextNotificationDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(21)
  tomorrow.setMinutes(30)

  return tomorrow
}

/**
 * Make a notification object.
 *
 * @return {object}
 */
function _makeNotification () {
 return {
   title: 'Hey!',
   body: '🎲 I want to play a game!',
   ios: {
     sound: true,
   },
   android: {
     sound: true,
     priority: 'high',
     sticky: false,
     vibrate: true,
   }
 }
}
