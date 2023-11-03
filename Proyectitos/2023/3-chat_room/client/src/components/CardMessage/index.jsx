import ButtonsIdentificateFakeUsers from '../ButtonsIdentificatefakeUsers';

const CardMessage = ({ text }) => {
  return (
    <div className='row '>
      <div className='col s12'>
        <div className='card teal darken-1 '>
          <div className='card-content white-text'>
            <span className='card-title center-align'>{text}</span>
            <ButtonsIdentificateFakeUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMessage;
