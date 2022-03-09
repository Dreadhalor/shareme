import { Sidebar, Login, UserProfile } from 'components';
import logo from 'assets/logo.png';
import Pins from './Pins';
import { HiMenu } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { getUser } from 'utils/data';
import { User } from 'utils/interfaces';
import { AiFillCloseCircle } from 'react-icons/ai';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // don't know why I'm not allowed to set this to null on startup but whatever
  const [user, setUser] = useState<User>();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
    let ref = scrollRef.current;
    ref?.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   console.log('user:');
  //   console.log(user);
  // }, [user]);

  return (
    <div className='h-full flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row'>
      {/* desktop nav */}
      <div className='hidden h-full flex-initial md:flex'>
        <Sidebar user={user && user} />
      </div>
      {/* mobile nav */}
      <div className='flex flex-row bg-blue-500 md:hidden'>
        <div className='flex w-full flex-row items-center justify-between p-2 shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='logo' className='w-28' />
          </Link>
        </div>
        {/* mobile sidebar contents */}
        {toggleSidebar && (
          <div className='fixed top-0 left-0 z-10 h-full w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md'>
            <div className='absolute flex w-full justify-end p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='my-auto cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='h-full flex-1 overflow-y-auto pb-2' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
