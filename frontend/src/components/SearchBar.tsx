import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { AiOutlineLogin } from 'react-icons/ai';

const SearchBar = ({ searchTerm, setSearchTerm, user }: any) => {
  const navigate = useNavigate();
  return (
    <div className='mt-5 flex w-full gap-2 pb-5 md:gap-5'>
      {/* again, not sure what the point of outline-none & border-none are here */}
      <div className='flex flex-1 items-center justify-start rounded-md border-none bg-white px-2 outline-none focus-within:shadow-md'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='w-full bg-white p-2 outline-none'
        />
      </div>
      <div className='flex gap-3'>
        <Link
          to='/create-pin'
          className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white'
        >
          <IoMdAdd />
        </Link>
        {user ? (
          <Link to={`/user-profile/${user?._id}`} className='hidden md:block'>
            <img
              src={user.image}
              alt='user'
              className='h-12 w-12 rounded-full'
            />
          </Link>
        ) : (
          <Link
            to={'/login'}
            className='hidden h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white md:flex'
          >
            {/* <img
                src={login_icon}
                alt='login'
                className='h-12 w-12 rounded-full'
              /> */}
            <AiOutlineLogin fontSize={26} />
            {/* <img
              src={login_icon_white_plain}
              alt='login'
              className='ml-[2px] mb-[4px] h-8 w-8'
            /> */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;