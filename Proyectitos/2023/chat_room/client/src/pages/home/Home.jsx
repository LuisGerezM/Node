import { useContext } from 'react';
import { UserContext } from '@/context/user_context';

import { rooms } from '@/mocks/data.mock';

import CardMessage from '@/components/card/Card';
import ButtonsIdentiFicatefakeUsers from '@/components/ButtonsIdentificatefakeUsers';
import RoomList from './components/RoomList';
import { FormCreateRoom } from './components/FormCreateRoom';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <section className='wrap-home'>
      <div className='row'>
        <div className='col s12 m6'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>Welcome {user ? user.name : ''}</span>
              <FormCreateRoom />
            </div>
            <ButtonsIdentiFicatefakeUsers />
          </div>
        </div>
        <div className='col s12 m6 offset-1'>
          {!user ? <CardMessage text='You need to log in' /> : <RoomList rooms={rooms} />}
        </div>
      </div>
    </section>
  );
};

export default Home;
