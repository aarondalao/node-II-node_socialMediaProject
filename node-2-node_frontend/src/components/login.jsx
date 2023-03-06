import React from 'react';
// import GoogleLogin from 'react-google-login';
// import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';

// assets
import shareVideo from '../assets/socialMediaNetwork.mp4';
import myLogo from '../assets/logo3.png';


const Login = () => {
  const responseGoogle = (response) => {
    console.log("=================================");
    console.log(response);
    console.log("=================================");
    
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo} type='video/mp4' loop controls={false} muted autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-end top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={myLogo} width='360px' alt="node by node logo" />
          </div>

          <div className='shadow-2xl w-80'>
          {/* TODO: replace react-google-login with google-auth-library */}
            {/* <GoogleLogin 
              clientId= { process.env.REACT_APP_GOOGLE_API_TOKEN }
              render={ (renderProps) => (
                <button type='button' className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                onClick={ renderProps.onClick } disabled={ renderProps.disabled }>
                  <FcGoogle className='mr-5'/>
                  Sign in with Google
                </button>
              )}

              onSuccess={ responseGoogle }
              onFailure={ responseGoogle }
              cookiePolicy="single_host_origin"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login