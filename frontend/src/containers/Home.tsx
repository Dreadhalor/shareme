import { Sidebar, Login, UserProfile } from 'components';
import logo from 'assets/logo.png';
import Pins from './Pins';
import { HiMenu } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { fetchUser } from 'utils/data';
import { User } from 'utils/interfaces';
import { AiFillCloseCircle } from 'react-icons/ai';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // don't know why I'm not allowed to set this to null on startup but whatever
  const [user, setUser] = useState<User>(null as any);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
    let ref = scrollRef.current;
    ref?.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   console.log('user:');
  //   console.log(user);
  // }, [user]);

  return (
    <div className='flex h-full flex-col bg-empty transition-height duration-75 ease-out md:flex-row'>
      {/* desktop nav */}
      <div className='hidden h-full flex-initial md:flex'>
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      {/* mobile nav */}
      <div className='z-10 flex flex-row bg-white shadow-md md:hidden'>
        <div className='flex w-full flex-row items-center justify-between p-2'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt='logo'
              className='h-9 w-9 rounded-full'
            />
          </Link>
        </div>
        {/* mobile sidebar contents */}
        {toggleSidebar && (
          <div className='fixed top-0 left-0 z-20 h-full animate-slide-in overflow-y-auto bg-white shadow-md'>
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
      <div
        className='flex flex-1 flex-col overflow-y-auto pb-2'
        ref={scrollRef}
      >
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
