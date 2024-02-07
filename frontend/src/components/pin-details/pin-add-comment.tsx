import { client } from 'utils/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const PinAddComment = (props: any) => {
  const { pinId, user, fetchPinDetails } = props;

  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

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
    <div className='mt-2 flex flex-wrap gap-3'>
      {user ? (
        <>
          <Link to={`/user-profile/${user._id}`} className='flex items-center'>
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
            className='rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white outline-none disabled:cursor-not-allowed disabled:opacity-50'
            onClick={addComment}
            disabled={comment.length === 0}
          >
            {addingComment ? 'Posting...' : 'Post'}
          </button>
        </>
      ) : (
        <h3 className='mx-auto mt-2'>
          <Link to={'/login'} className='hover:underline'>
            Log in to add a comment!
          </Link>
        </h3>
      )}
    </div>
  );
};

export { PinAddComment };
