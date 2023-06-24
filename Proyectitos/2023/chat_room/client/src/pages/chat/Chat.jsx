import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import { UserContext } from '@/context/user_context';
import { FormChat } from './components/FormChat';
import { ShowMessages } from './components/show-messages';

import './styles.css';

let socket;
const ENDPT = 'localhost:5000';

const Chat = () => {
  const { user } = useContext(UserContext);
  let { room_id, room_name } = useParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPT);
    socket.emit('join', { name: user.name, room_id, user_id: user.id });

    return () => {
      socket.off('create-room');
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  return (
    <section className='chat'>
      <h1 className='chat-h1'>
        {room_id} {room_name}
      </h1>

      {!messages.length ? (
        <div> No messages in this room!! </div>
      ) : (
        messages.map((message, index) => (
          <ShowMessages key={index} name={message.name} text={message.text} />
        ))
      )}

      <FormChat message={message} room_id={room_id} setMessage={setMessage} socket={socket} />
    </section>
  );
};

export default Chat;
