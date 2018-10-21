import _ from 'lodash'

// // // //

// removeNotification
// Helper function used to remove a notification from state.collection
function removeNotification (collection, id) {
  return _.filter(collection, (e) => { return e.id !== id })
}

// // // //

// Notification Module mutations
export default {
  // Adds a notification to state.collection
  add (state, notification) {
    // Assigns unique ID to notification
    // this is used for removing the notification after a timeout
    let uniqueId = _.uniqueId()
    notification.id = uniqueId

    // Adds the notification to state.collection
    state.collection.push(notification)

    // Removes the notification after
    setTimeout(() => {
      state.collection = removeNotification(state.collection, uniqueId)
    }, notification.timeout || 2500)
  },

  // Removes a Notification from state.collection
  remove (state, notificationId) {
    state.collection = removeNotification(state.collection, notificationId)
  }
}
