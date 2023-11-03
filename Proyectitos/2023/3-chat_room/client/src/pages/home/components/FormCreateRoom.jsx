import { useEffect, useState } from 'react';

import io from 'socket.io-client';

let socket;

export const FormCreateRoom = () => {
  const [room, setRoom] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const ENDPT = 'localhost:5000';

  useEffect(() => {
    socket = io(ENDPT);
    socket.on('connect', () => setIsConnected(true));

    return () => {
      socket.off('create-room');
      socket.off('connect');
    };
  }, [ENDPT]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!e.target.value) throw new Error('Should add room name');

    socket.emit('create-room', room);
    setRoom('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='input-field col s12'>
          <input
            id='room'
            type='text'
            className='validate'
            placeholder='Enter a room name'
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <label className='active' htmlFor='room'>
            Room
          </label>
        </div>
      </div>
      <button className='btn'>Create Room</button>
    </form>
  );
};
