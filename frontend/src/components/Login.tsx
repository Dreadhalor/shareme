import shareVideo from 'assets/share.mp4';
import logo_white from 'assets/logowhite.png';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { client } from 'client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      const profile = response.profileObj;
      localStorage.setItem('user', JSON.stringify(profile));
      const { name, googleId, imageUrl } = profile;
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
        // this field isn't really necessary but I don't want a repeat of NetWorth
        googleLoginResponse: JSON.stringify(response),
      };
      client.createIfNotExists(doc).then(() => navigate('/', { replace: true }));
    } else console.log(response);
  };
  const responseError = (error: any) => {
    console.log(error);
  };

  return (
    <div className='flex h-full flex-col items-center bg-slate-500'>
      <div className='relative h-full w-full'>
        <video loop controls={false} muted autoPlay className='h-full w-full object-cover'>
          {/* this seems to work even if I don't use the type field*/}
          {/* also it works even if I don't use the <source> tag but says 'type' does not exist on HTMLVideoElement */}
          <source src={shareVideo} type='video/mp4'></source>
        </video>
        <div className='absolute inset-0 flex bg-blackOverlay'>
          <div className='m-auto flex flex-col'>
            <div className='mx-auto p-5'>
              <img src={logo_white} width='130px' alt='logo'></img>
            </div>
            <div className='mx-auto shadow-2xl'>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN!}
                render={(renderProps) => (
                  <button
                    type='button'
                    // unclear what 'outline-none' does but maybe it's a cross-compatibility thing
                    className='flex min-w-0 cursor-pointer flex-row gap-3 rounded-lg bg-mainColor p-3 outline-none'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className='my-auto' />
                    Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseError}
                cookiePolicy='single_host_origin'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
