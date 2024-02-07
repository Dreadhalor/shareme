import { Link, NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { User } from 'utils/interfaces';
import { Dispatch, SetStateAction } from 'react';
import { categories } from 'utils/data';
import { IoIosArrowForward } from 'react-icons/io';
import logo from 'assets/logo.png';
import login_icon from 'assets/login-icon.svg';

type Props = {
  user: User;
  closeToggle: Dispatch<SetStateAction<boolean>>;
};

const isNotActiveStyle =
  'flex items-center gap-3 px-5 capitalize text-gray-500 transition-all duration-200 ease-in-out hover:text-black';
const isActiveStyle =
  'flex items-center gap-3 border-r-2 border-black px-5 font-extrabold capitalize transition-all duration-200 ease-in-out';

const Sidebar = ({ user, closeToggle }: Props) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className='hide-scrollbar min-w-210 flex h-full flex-col justify-between overflow-y-auto bg-white'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='w-190 my-6 flex items-center gap-2 px-5 pt-1'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
            >
              <img
                src={category.image}
                alt={category.name}
                className='h-8 w-8 rounded-full shadow-sm'
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user ? (
        <Link
          to={`/user-profile/${user._id}`}
          className='mx-3 my-5 mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-lg'
        >
          <img
            src={user.image}
            className='h-10 w-10 rounded-full'
            alt='user-profile'
          />
          <p>{user.userName}</p>
          <IoIosArrowForward className='h-5 w-5' />
        </Link>
      ) : (
        <Link
          to={'/login'}
          className='mx-3 my-5 mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-lg'
        >
          <img
            src={login_icon}
            className='h-10 w-10 rounded-full contrast-[0.1]'
            alt='login'
          />
          <p className='mx-auto text-gray-500'>Not logged in</p>
        </Link>
      )}
    </div>
  );
};

export { Sidebar };
