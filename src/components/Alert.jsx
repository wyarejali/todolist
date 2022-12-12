// All necessary dependences
import React, { useEffect } from 'react'

// Alert
const Alert = ({ msg, type, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeOut)
  })

  return (
    <div>
      <p className={`wa_alert wa_alert-${type}`}>{msg}</p>
    </div>
  )
}

export default Alert
