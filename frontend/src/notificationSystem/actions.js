export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

export function notify({ id, type, message }) {
  return {
    type: ADD_NOTIFICATION,
    id,
    messageType: type,
    message
  }
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id
  }
}
