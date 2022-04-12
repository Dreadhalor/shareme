import { client } from 'client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PinAddComment from './PinAddComment';
import PinCommentsList from './PinCommentsList';

const PinComments = (props: any) => {
  const { pinDetail, pinId, user, fetchPinDetails } = props;

  return (
    <>
      <h2 className='mt-5 text-2xl'>Comments</h2>
      <PinCommentsList pinDetail={pinDetail} />
      <PinAddComment
        pinId={pinId}
        user={user}
        fetchPinDetails={fetchPinDetails}
      />
    </>
  );
};

export default PinComments;
