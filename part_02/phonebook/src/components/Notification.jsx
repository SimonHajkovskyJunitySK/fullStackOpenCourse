const Notification = ({message, color}) => {
  if (message === null) {
    return null
  }

  console.log(color)
  const notificationStyle = {color: color}

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification