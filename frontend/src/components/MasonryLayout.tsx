import Masonry from 'react-masonry-css';
import { IPin } from 'utils/interfaces';
import { Pin } from 'components';

const MasonryLayout = ({ pins }: { pins: IPin[] }) => {
  const breakpointObject = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <div>
      {pins?.length > 0 ? (
        <Masonry
          className='flex animate-slide-fwd'
          breakpointCols={breakpointObject}
        >
          {pins?.map((pin: IPin) => (
            <Pin key={pin._id} pin={pin} />
          ))}
        </Masonry>
      ) : (
        <div className='mt-2 flex w-full items-center justify-center text-xl font-bold'>
          No pins found!
        </div>
      )}
    </div>
  );
};

export default MasonryLayout;
