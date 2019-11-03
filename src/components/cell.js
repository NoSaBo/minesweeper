import React, { useState } from 'react'

function Cell(props) {
  console.log('data: ', props)
  return (
    <div style={{ width: '10px', height: '10px', padding: '2px' }}>
      <span>{props.isMarked ? 'M' : props.isHidden ? '' : props.value}</span>
    </div>
  )
}

export default Cell
