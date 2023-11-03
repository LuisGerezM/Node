import { UserContext } from '@/context/user_context';
import { users } from '@/mocks/data.mock';
import { useContext } from 'react';

const ButtonsIdentificateFakeUsers = () => {
  const { setUser } = useContext(UserContext);

  const setAsLuis = () => {
    setUser(users.luis);
  };

  const setAsFer = () => {
    setUser(users.fer);
  };

  return (
    <div className='buttons-identificate-fake-users card-action center-align'>
      <a className='buttons-identificate-fake-users-a' href='#' onClick={setAsLuis}>
        <strong>set as Luis</strong>
      </a>
      <a className='buttons-identificate-fake-users-a' href='#' onClick={setAsFer}>
        <strong>set as Fer</strong>
      </a>
    </div>
  );
};
export default ButtonsIdentificateFakeUsers;
