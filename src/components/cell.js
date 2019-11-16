import React from 'react'
import { Mine, Flag } from './icons'
import 'bootstrap/dist/css/bootstrap.css'

const generateColor = number => {
  let r = number * 5
  let g = number * 20
  let b = number * 15
  return `rgba(${r}, ${g}, ${b}, 1)`
}

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
      <button
        type="button"
        className={`p-3 btn ${props.isHidden ? 'btn-secondary' : 'btn-light'}`}
        style={{ border: 'thin solid silver' }}
      >
        {props.isMarked ? (
          <Flag width="25" height="25" color="whitesmoke" />
        ) : props.isHidden ? (
          <div style={{ height: '25px', width: '25px' }} />
        ) : props.value === -1 ? (
          <Mine width="25" height="25" color="salmon" />
        ) : (
          <div
            className={'text-center'}
            style={{
              height: '25px',
              width: '25px',
              color: generateColor(props.value),
              fontSize: '1.5em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {props.value === 0 ? '' : props.value}
          </div>
        )}
      </button>
    </div>
  )
}

export default Cell
