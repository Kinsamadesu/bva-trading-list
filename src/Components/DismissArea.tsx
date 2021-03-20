import React from 'react'

const DismissArea = ({
  onDismissCallback,
  visible,
}: {
  visible: boolean
  onDismissCallback: Function
}) => {
  return (
    <div
      style={{ display: visible ? 'block' : 'none' }}
      onClick={() => onDismissCallback()}
      id="dismissArea"
    ></div>
  )
}

export default DismissArea
