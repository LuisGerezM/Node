import { Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/user_context';

import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat/:room_id/:room_name' element={<Chat />} />
      </Routes>
    </UserProvider>
  );
};
export default App;
