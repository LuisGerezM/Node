export const FormChat = ({ message, room_id, setMessage, socket }) => {
  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, room_id, () => setMessage(''));
    }
  };

  return (
    <form className='form-chat col s10' onSubmit={sendMessage}>
      <input
        className='input-field col s12'
        type='text'
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={event => (event.key === 'enter' ? sendMessage(event) : null)}
      />
      <button>Send Message</button>
    </form>
  );
};
