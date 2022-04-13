import { client, urlFor } from 'client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IPin } from 'utils/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { getUserFromLocalStorage } from 'utils/data';

const Pin = ({ pin }: { pin: IPin }) => {
  const { postedBy, save, _id, image, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const alreadySaved =
    (save?.filter((item: any) => item.postedBy._id === user?.googleId)
      ?.length ?? 0) > 0;

  const savePin = (id: string) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };
  const deletePin = (id: string) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  const cleanUrl = (url: string) => {
    let prefixes = ['https://', 'http://', 'www.'];
    //slice off all prefixes up to the second-level domain
    prefixes.forEach((prefix: string) => {
      if (url.indexOf(prefix) === 0) {
        url = url.slice(prefix.length);
      }
    });
    return url;
  };

  return (
    <div className='w-full p-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className='relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg'
      >
        {image && (
          <img
            className='w-full rounded-lg'
            alt='user-post'
            src={urlFor(image).width(250).url()}
          />
        )}
        {postHovered && (
          <div className='absolute top-0 z-50 flex h-full w-full flex-col justify-between p-1.5'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-row gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  // again no clue why outline-none is here but I don't care enough to question this anymore
                  className='text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  className='rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md'
                  onClick={(e) => e.stopPropagation()}
                >
                  {save?.length} saved
                </button>
              ) : (
                <button
                  type='button'
                  className='rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className='flex w-full items-center justify-between gap-2'>
              {destination && (
                <a
                  href={destination}
                  target='blank'
                  rel='noreferrer'
                  className='flex items-center gap-2 truncate rounded-full bg-white py-2 px-4 text-right font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md'
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsFillArrowUpRightCircleFill className='flex-shrink-0' />
                  <span className='truncate'>{cleanUrl(destination)}</span>
                </a>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  type='button'
                  className='text-dark rounded-3xl bg-white p-2 text-base font-bold opacity-70 outline-none hover:opacity-100 hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className='mt-2 flex items-center gap-2'
      >
        <img
          className='h-8 w-8 rounded-full object-cover'
          src={postedBy?.image}
          alt='user-profile'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;