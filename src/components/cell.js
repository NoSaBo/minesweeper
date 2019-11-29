import React from 'react'
import { Mine, Flag } from './icons'
import 'bootstrap/dist/css/bootstrap.css'

const generateColor = number => {
  return `hsla(${number < 5 ? number * 90 : (number * 90) + 45}, 90%, 30%, 1)`
}

function Cell(props) {
  const wSize = window.innerWidth > 1000 ?  '70px' : '7vw';
  const wIconSize = window.innerWidth > 1000 ?  '40px' : '3vw';
  const fontSize = window.innerWidth > 1000 ?  '40px' : '3.5vw';
  return (
    <div
      className="border border-light"
      onClick={() => props.onLeftClick()}
      onContextMenu={e => {
        e.preventDefault()
        props.onRightClick()
      }}
      style={{ height: wSize, width: wSize }}
    >
      <button
        type="button"
        className={`p-0 btn ${props.isHidden ? 'btn-secondary' : 'btn-light'}`}
        style={{ border: 'thin solid silver', height: "100%", width: "100%" }}
      >
        {props.isMarked ? (
          <Flag width={wIconSize} height={wIconSize} color="whitesmoke" />
        ) : props.isHidden ? (
          <div style={{ }} />
        ) : props.value === -1 ? (
          <Mine width={wIconSize} height={wIconSize} color="salmon" />
        ) : (
                <div
                  className={'text-center'}
                  style={{
                    color: generateColor(props.value),
                    fontSize: fontSize,
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
