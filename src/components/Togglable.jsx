import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef( (props,refs) => {
  const [showForm, setShowForm] = useState(false)
  const onButtonClick = () => {
    setShowForm(!showForm)
  }
  useImperativeHandle(refs, () => {
    return {
      onButtonClick
    }
  })
  if (showForm) {
    return (
      <div>
        {props.children}
        <button onClick={onButtonClick}>{props.altmessage}</button>
      </div>
    )
  }
  else {
    return (
      <div><button onClick={onButtonClick}>{props.message}</button></div>
    )
  }
})

Togglable.propTypes = {
  message: PropTypes.string.isRequired,
  altmessage: PropTypes.string.isRequired
}

export default Togglable