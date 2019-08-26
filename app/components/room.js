import React, { forwardRef } from 'react';

const Room = forwardRef(({ change_room }, ref) => {
  return (
    <div className="room-wrapper">
      
      <input type="text" ref={ref} className="room-input"></input>
      <button className="room-input-btn" onClick={change_room}>join</button>
    </div>
  )
})

export default Room;