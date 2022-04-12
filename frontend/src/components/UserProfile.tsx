import { client } from 'client';
import { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from 'utils/data';
import { MasonryLayout, Spinner } from 'components';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [pins, setPins] = useState<any>(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();
  const { userId } = useParams();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getButtonStyle = (btn: string) => {
    return activeBtn === btn
      ? 'bg-red-500 text-white'
      : 'bg-primary text-black';
  };

  const random_image =
    'https://source.unsplash.com/800x450/?nature,photography';

  useEffect(() => {
    const query = userQuery(userId!);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const query = userCreatedPinsQuery(userId!);
      client.fetch(query).then((data) => {
        setPins(data);
      });
    } else if (text === 'Saved') {
      const query = userSavedPinsQuery(userId!);
      client.fetch(query).then((data) => {
        setPins(data);
      });
    }
  }, [text]);

  if (!user) return <Spinner message='Loading user profile...' />;

  return (
    <div className='relative h-full items-center justify-center pb-2'>
      <div className='flex flex-col pb-5'>
        <div className='relative mb-7 flex flex-col'>
          <div className='flex flex-col items-center justify-center'>
            <img
              src={random_image}
              className='h-370 w-full object-cover shadow-lg xl:h-510'
              alt='banner'
            />
            <img
              className='-mt-10 h-20 w-20 rounded-full object-cover shadow-xl'
              src={user.image}
              alt='user'
            />
            <h1 className='mt-3 text-center text-3xl font-bold'>
              {user.userName}
            </h1>
            <div className='z-1 absolute top-0 right-0 p-2'>
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN!}
                  render={(renderProps) => (
                    <button
                      type='button'
                      className='cursor-pointer rounded-full bg-white p-2 shadow-md outline-none'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        color='red'
                        fontSize={21}
                        className='my-auto'
                      />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                />
              )}
            </div>
          </div>
          <div className='mb-4 mt-2 flex flex-row justify-center gap-2 text-center'>
            <button
              type='button'
              className={`${getButtonStyle(
                'created'
              )} rounded-full py-2 px-4 font-bold shadow-md outline-none`}
              onClick={(e: any) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
            >
              Created
            </button>
            <button
              type='button'
              className={`${getButtonStyle(
                'saved'
              )} rounded-full py-2 px-4 font-bold shadow-md outline-none`}
              onClick={(e: any) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
            >
              Saved
            </button>
          </div>
          <div className='px-2'>
            <MasonryLayout pins={pins} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
