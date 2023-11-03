const Room = ({ name }) => {
  return (
    <div className='card horizontal'>
      <div className='card-stacked'>
        <div className='card-content'>
          <p className='center'>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
