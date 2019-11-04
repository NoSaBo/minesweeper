import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Cell(props) {
  return (
    <div className="m-1 p-2 border border-light bg-light">
      <span>{props.isMarked ? 'M' : props.isHidden ? '' : props.value}</span>
    </div>
  )
}

export default Cell
