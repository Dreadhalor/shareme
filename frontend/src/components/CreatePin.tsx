import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from 'client';
import Spinner from './Spinner';
import { categories } from 'utils/data';

const CreatePin = ({ user }: any) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    const { type, name } = file;
    const type_parts = type.split('/');
    let correct_type = type_parts[0] === 'image';
    setWrongImageType(correct_type);
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

  return (
    // <div className='mt-5 flex flex-col items-center justify-center lg:h-4/5'>
    <div className='mt-5 flex flex-col items-center justify-center'>
      {fields && (
        <p className='mb-5 text-xl text-red-500 transition-all duration-150 ease-in'>
          Please fill in all the fields.
        </p>
      )}
      {/* <div className='flex w-full flex-col items-center justify-center bg-white p-3 lg:w-4/5 lg:flex-row lg:p-5'> */}
      <div className='flex w-full flex-col items-center justify-center bg-white p-3 lg:w-4/5 lg:flex-row'>
        <div className='flex w-full flex-0.7 bg-secondaryColor p-3'>
          <label className='h-full w-full'>
            <div className='flex h-420 w-full flex-col items-center justify-center border-2 border-dotted border-gray-300 p-3'>
              {loading && <Spinner />}
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
                      Use high-quality image less than 20MB
                    </p>
                  </div>
                  <input
                    type='file'
                    name='upload-image'
                    onChange={uploadImage}
                    className='h-0 w-0'
                    disabled={!!imageAsset}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
