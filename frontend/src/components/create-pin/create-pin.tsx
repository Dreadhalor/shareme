import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { client } from 'utils/client';
import { Spinner } from 'components';
import { categories } from 'utils/data';
import { ImageUploadArea } from './image-upload-area';
import { TextfieldArea } from './textfield-area';

const CreatePin = ({ user }: any) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState<string>(null as any);

  const [fields, setFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState<any>(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const uploadPin = async () => {
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
    setUploading(true);

    client.create(doc).then(() => {
      setUploading(false);
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
      <div className='relative flex w-full flex-col items-center justify-center bg-white p-3 lg:mx-4 lg:flex-row'>
        {uploading && (
          <div className='absolute bottom-0 left-0 right-0 top-0 z-10 bg-[#ffffffaa]'>
            <Spinner />
          </div>
        )}
        <ImageUploadArea
          loading={loading}
          setLoading={setLoading}
          setFields={setFields}
          imageAsset={imageAsset}
          setImageAsset={setImageAsset}
          wrongImageType={wrongImageType}
          setWrongImageType={setWrongImageType}
        />
        <TextfieldArea
          setFields={setFields}
          setTitle={setTitle}
          setAbout={setAbout}
          setDestination={setDestination}
          setCategory={setCategory}
          user={user}
          title={title}
          about={about}
          destination={destination}
          categories={categories}
          uploadPin={uploadPin}
        />
      </div>
    </div>
  );
};

export { CreatePin };
