import React from 'react'

const Modal = props => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
  const modalStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    zIndex: 99,
    backgroundColor: 'whitesmoke',
    opacity: 0.6
  }
  const contentStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 'auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  }

  return (
    <div className="container-fluid" style={containerStyle}>
      <div style={modalStyle}></div>
      <div style={contentStyle}> {props.child} </div>
    </div>
  )
}

export default Modal
