import shareVideo from 'assets/share.mp4';

const Login = () => {
  return (
    <div className='flex h-full flex-col items-center bg-slate-500'>
      <div className='relative h-full w-full'>
        <video src={shareVideo} />
      </div>
    </div>
  );
};

export default Login;
