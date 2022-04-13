import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import { client } from 'client';
import { Spinner } from 'components';
import { categories } from 'utils/data';

const CreatePin = ({ user }: any) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState<string>(null as any);
  const [imageAsset, setImageAsset] = useState<any>(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e: any) => {
    setFields(false);
    const file = e.target.files[0];
    const { type, name } = file;
    const type_parts = type.split('/');
    let correct_type = type_parts[0] === 'image';
    setWrongImageType(!correct_type);
    if (correct_type) {
      setLoading(true);
      client.assets
        .upload('image', file, { contentType: type, filename: name })
        .then((document: any) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('Image upload error:', error);
        });
    }
  };

  const savePin = async () => {
    if (
      !title ||
      !about ||
      !destination ||
      !category ||
      !imageAsset?._id ||
      wrongImageType
    ) {
      setFields(true);
      //setFields back to false after 2 seconds
      setTimeout(() => {
        setFields(false);
      }, 2000);
      return;
    }
    const doc = {
      _type: 'pin',
      title,
      about,
      destination,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,
      },
      category,
    };
    setLoading(true);

    client.create(doc).then((response: any) => {
      setLoading(false);
      navigate('/');
    });
  };

  //if there is no user, return a div saying you need to login
  if (!user) {
    return (
      <div className='mt-3 flex h-full flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          <Link to={'/login'} className='hover:underline'>
            Log in to create a pin!
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      {fields && (
        <p className='mb-5 text-xl text-red-500 transition-all duration-150 ease-in'>
          Please fill in all the fields.
        </p>
      )}
      <div className='flex w-full flex-col items-center justify-center bg-white p-3 lg:mx-4 lg:flex-row'>
        <div className='flex w-full min-w-0 flex-0.7 bg-secondaryColor p-3 lg:flex-1'>
          <div className='relative h-full w-full'>
            {!(imageAsset || loading) && (
              <label
                htmlFor='upload-image-id'
                className='absolute top-0 left-0 h-full w-full cursor-pointer'
              ></label>
            )}
            {loading && (
              <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-[#ffffffaa]'>
                <Spinner />
              </div>
            )}
            <div className='flex h-420 w-full flex-col items-center justify-center border-2 border-dotted border-gray-300 p-3'>
              {wrongImageType && <p>Wrong image type</p>}
              {!imageAsset ? (
                <div className='h-full w-full'>
                  <div className='flex h-full flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-2xl font-bold'>
                        <AiOutlineCloudUpload />
                      </p>
                      <p className='text-lg'>Click to upload</p>
                    </div>
                    <p className='mt-32 text-center text-gray-400'>
                      Use a high-quality image less than 20MB
                    </p>
                  </div>
                  <input
                    type='file'
                    id='upload-image-id'
                    name='upload-image'
                    onChange={uploadImage}
                    className='h-0 w-0'
                    disabled={!!imageAsset}
                  />
                </div>
              ) : (
                <div className='relative h-full'>
                  <img
                    src={imageAsset?.url}
                    alt='uploaded'
                    className='h-full w-full object-contain'
                  />
                  <button
                    type='button'
                    className='absolute bottom-3 right-3 cursor-pointer rounded-full bg-white p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md'
                    onClick={() => {
                      setFields(false);
                      setImageAsset(null);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='mt-5 flex w-full flex-1 flex-col gap-6 overflow-auto lg:pl-5'>
          <input
            type='text'
            value={title}
            onChange={(e) => {
              setFields(false);
              setTitle(e.target.value);
            }}
            placeholder='Add your title here'
            className='border-b-2 border-gray-200 p-2 text-2xl font-bold outline-none sm:text-3xl'
          />
          {user && (
            <div className='my-2 flex items-center gap-2 rounded-lg bg-white'>
              <img
                src={user.image}
                alt='User profile'
                className='h-10 w-10 rounded-full'
              />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}
          <input
            type='text'
            value={about}
            onChange={(e) => {
              setFields(false);
              setAbout(e.target.value);
            }}
            placeholder='What is your pin about?'
            className='border-b-2 border-gray-200 p-2 text-base font-bold outline-none sm:text-lg'
          />
          <input
            type='text'
            value={destination}
            onChange={(e) => {
              setFields(false);
              setDestination(e.target.value);
            }}
            placeholder='Add a destination link!'
            className='border-b-2 border-gray-200 p-2 text-base font-bold outline-none sm:text-lg'
          />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 text-lg font-semibold sm:text-xl'>
                Choose pin category
              </p>
              <select
                onChange={(e) => {
                  setFields(false);
                  setCategory(e.target.value);
                }}
                className='w-4/5 cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base capitalize outline-none'
              >
                <option value='other' className='bg-white'>
                  Select Category
                </option>
                {categories.map((category: any) => (
                  <option
                    key={category.name}
                    value={category.name}
                    className='border-0 bg-white text-base text-black outline-none'
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-5 flex items-end justify-end'>
              <button
                type='button'
                className='w-28 rounded-full bg-red-500 p-2 font-bold text-white outline-none'
                onClick={savePin}
              >
                Save Pin!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
