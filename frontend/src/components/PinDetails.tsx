import { client, urlFor } from 'client';
import { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { pinDetailMorePinQuery, pinDetailQuery } from 'utils/data';
import { v4 as uuidv4 } from 'uuid';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const PinDetails = (props: any) => {
  const { user } = props;

  const [pins, setPins] = useState<any>(null);
  const [pinDetail, setPinDetail] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  //useParams allows me to get the pinId from the url
  const { pinId } = useParams();

  const fetchPinDetails = async () => {
    let query = pinDetailQuery(pinId!);
    const details = (await client.fetch(query))[0];
    setPinDetail(details);
    if (details) {
      //fetch related pins based on the category
      query = pinDetailMorePinQuery(details);
      const pins = await client.fetch(query);
      setPins(pins);
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]); // eslint-disable-line react-hooks/exhaustive-deps

  //if there is no pinDetail, return a Spinner
  if (!pinDetail) {
    return <Spinner message='Loading pin...' />;
  }

  const addComment = async () => {
    if (comment) {
      setAddingComment(true);
      const new_comment = {
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      };
      client
        .patch(pinId!)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [new_comment])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  return (
    <>
      <div className='m-auto flex max-w-[1500px] flex-col rounded-[32px] bg-white xl:flex-row'>
        <div className='flex flex-initial items-center justify-center md:items-start'>
          <img
            className='rounded-lg'
            alt='pin'
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
          />
        </div>
        <div className='w-full flex-1 p-5 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <a
                href={`${pinDetail?.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                // again no clue why outline-none is here but I don't care enough to question this anymore
                className='text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            {pinDetail?.destination && (
              <a
                href={pinDetail.destination}
                target='_blank'
                rel='noreferrer'
                // className='flex items-center gap-2 truncate rounded-full bg-white py-2 px-4 text-right font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md'
                onClick={(e) => e.stopPropagation()}
              >
                {pinDetail.destination}
              </a>
            )}
          </div>
          <div>
            <h1 className='mt-3 break-words text-4xl font-bold'>
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail?.postedBy?._id}`}
            // it don't matter at all that we're rounding the borders because the background is white but whatever
            className='mt-5 flex items-center gap-2 rounded-lg bg-white'
          >
            <img
              className='h-8 w-8 rounded-full object-cover'
              src={pinDetail?.postedBy?.image}
              alt='user-profile'
            />
            <p className='font-semibold capitalize'>
              {pinDetail?.postedBy?.userName}
            </p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='flex max-h-370 flex-col gap-5 overflow-y-auto rounded-md border-4 border-gray-100 p-2'>
            {pinDetail?.comments?.length ? (
              pinDetail?.comments?.map((comment: any, index: number) => (
                <div
                  key={index}
                  className='flex items-center gap-2 rounded-lg bg-white'
                >
                  <Link
                    to={`user-profile/${comment?.postedBy?._id}`}
                    className='mb-auto flex-shrink-0'
                  >
                    <img
                      className='h-10 w-10 cursor-pointer rounded-full object-cover'
                      src={comment.postedBy.image}
                      alt='user-profile'
                    />
                  </Link>
                  <div className='flex min-w-0 flex-col'>
                    <p className='font-semibold capitalize'>
                      {comment.postedBy.userName}
                    </p>
                    <p className='break-words text-sm'>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              // if there are no comments, show a message
              <p className='text-center text-gray-500'>
                No comments yet. Be the first!
              </p>
            )}
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link to={`user-profile/${user._id}`} className='flex items-center'>
              <img
                className='h-10 w-10 cursor-pointer rounded-full object-cover'
                src={user.image}
                alt='user-profile'
              />
            </Link>
            <input
              type='text'
              className='flex-1 rounded-2xl border-2 border-gray-100 p-2 outline-none focus:border-gray-300'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type='button'
              className='disabled:cursor-not-allowed rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white outline-none disabled:opacity-50'
              onClick={addComment}
              disabled={comment.length === 0}
            >
              {addingComment ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <>
          <h2 className='mt-8 mb-4 text-center text-2xl font-bold'>
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
};

export default PinDetails;
