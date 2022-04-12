import { Link } from 'react-router-dom';

const PinCommentsList = (props: any) => {
  const { pinDetail } = props;

  return (
    <div className='flex max-h-370 flex-col gap-5 overflow-y-auto rounded-md border-4 border-gray-100 p-2'>
      {pinDetail?.comments?.length ? (
        pinDetail?.comments?.map((comment: any, index: number) => (
          <div
            key={index}
            className='flex items-center gap-2 rounded-lg bg-white'
          >
            <Link
              to={`/user-profile/${comment?.postedBy?._id}`}
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
  );
};

export default PinCommentsList;
