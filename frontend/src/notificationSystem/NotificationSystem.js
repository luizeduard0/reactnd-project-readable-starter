import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNotification } from './actions'
import './style.css'

class NotificationSystem extends Component {
  dismissNotification = id => {
    this.props.dispatch(deleteNotification(id))
  }
  componentDidMount() {
    this.timeoutToDimiss()
  }
  componentDidUpdate() {
    this.timeoutToDimiss()
  }
  timeoutToDimiss() {
    let id = typeof this.props.notifications[0] !== 'undefined' ? this.props.notifications[0].id : null
    if(!id) return
    setTimeout(() => {
      this.dismissNotification(id)
    }, 2000)
  }
  render() {
    const { notifications } = this.props
    return (
      <div className='notification-system'>
        {notifications.length && (
          notifications.map(notification => (
            <div key={notification.id} onClick={() => this.dismissNotification(notification.id)} className={`notification ${notification.type}`}>
              <i className='glyphicon glyphicon-remove remove-notification'></i>
              {notification.message}
            </div>
          ))
        ) || <span />}
      </div>
    )
  }
}
function mapStateToProps({ notifications }) {
  return {
    notifications: Object.keys(notifications).map(notId => notifications[notId])
  }
}
export default connect(mapStateToProps)(NotificationSystem)
