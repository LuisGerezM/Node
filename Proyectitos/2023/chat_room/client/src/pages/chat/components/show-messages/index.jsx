import './styles.css';

export const ShowMessages = ({ name, text }) => {
  return (
    <aticle className='article'>
      <h4>{name} dice:</h4>
      <h6 className='article-h6'>{text}</h6>
    </aticle>
  );
};
