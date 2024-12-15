const Notification = ({ msg, type }) => {
  if (msg===undefined || msg===null) {
    return null
  }

  let style = {
    backgroundColor: 'lightgrey',
    font: 'Roboto',
    fontSize: '20px',
    padding: '10px',
    borderStyle: 'solid',
    borderRadius: '5px',
    marginBottom: '10px'
  }
  if (type==='error') {
    style = { ...style, color:'red' }
  }
  else {
    style = { ...style, color:'green' }
  }

  return (
    <div style={style}>{msg}</div>
  )
}

export default Notification