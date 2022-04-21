import { client } from 'utils/client';
import Spinner from 'components/Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const ImageUploadArea = (props: any) => {
  const {
    loading,
    setLoading,
    setFields,
    imageAsset,
    setImageAsset,
    wrongImageType,
    setWrongImageType,
  } = props;

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

  return (
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
                {/* <p className='text-center text-gray-400'>(20MB limit)</p> */}
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
  );
};

export default ImageUploadArea;
