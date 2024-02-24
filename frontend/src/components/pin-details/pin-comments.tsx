import { PinAddComment } from './pin-add-comment';
import { PinCommentsList } from './pin-comments-list';

const PinComments = (props: any) => {
  const { pinDetail, pinId, fetchPinDetails } = props;

  return (
    <>
      <h2 className='mt-5 text-2xl'>Comments</h2>
      <PinCommentsList pinDetail={pinDetail} />
      <PinAddComment pinId={pinId} fetchPinDetails={fetchPinDetails} />
    </>
  );
};

export { PinComments };
