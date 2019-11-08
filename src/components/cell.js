import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Cell(props) {
  return (
    <div className="border border-light">
      <button type="button" className="p-3 btn btn-light">
        {props.isMarked ? 'M' : props.isHidden ? '' : props.value}
      </button>
    </div>
  )
}

export default Cell
