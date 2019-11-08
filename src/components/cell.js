import React, { useState } from 'react'
import { Mine, Flag } from './icons'
import 'bootstrap/dist/css/bootstrap.css'

function Cell(props) {
  return (
    <div
      className="border border-light"
      onClick={() => props.onLeftClick()}
      onContextMenu={e => {
        e.preventDefault()
        props.onRightClick()
      }}
    >
      <button type="button" className="p-3 btn btn-light">
        {props.isMarked ? (
          <Flag width="20" height="20" color="green" />
        ) : props.isHidden ? (
          ''
        ) : props.value === -1 ? (
          <Mine width="20" height="20" />
        ) : (
          <div style={{ height: '20px', width: '20px' }}> {props.value} </div>
        )}
      </button>
    </div>
  )
}

export default Cell
