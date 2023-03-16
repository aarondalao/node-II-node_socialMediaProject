/*
  NOTES:
  
  google id credential or as they call it CredentialResponse is as a base64-encoded JSON Web Token (JWT) string.
  here's its parts and its uses when decoded using a JWT decoder

  header
  {
    "alg": "RS256",
    "kid": "f05415b13acb9590f70df862765c655f5a7a019e", // JWT signature
    "typ": "JWT"
  }
  payload
  {
    "iss": "https://accounts.google.com",                                           // The JWT's issuer
    "nbf":  161803398874,
    "aud": "314159265-pi.apps.googleusercontent.com",                               // Your server's client ID
    "sub": "3141592653589793238",                                                   // The unique ID of the user's Google Account
    "hd": "gmail.com",                                                              // If present, the host domain of the user's GSuite email address
    "email": "elisa.g.beckett@gmail.com",                                           // The user's email address
    "email_verified": true,                                                         // true, if Google has verified the email address
    "azp": "314159265-pi.apps.googleusercontent.com",
    "name": "Elisa Beckett",

    "picture": "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler",  // If present, a URL to user's profile picture
    "given_name": "Elisa",
    "family_name": "Beckett",
    "iat": 1596474000,                                                              // Unix timestamp of the assertion's creation time
    "exp": 1596477600, // Unix timestamp of the assertion's expiration time
    "jti": "abc161803398874def"
  }

  an exerpt from the documentation: https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
*/
import React from 'react';
import jwt_decoder from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';

import client from '../client';
import shareVideo from '../assets/socialMediaNetwork.mp4';
import myLogo from '../assets/logo3.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (_cr) => {

    // decrypt credentialResponse to be able to use its information
    const payload = jwt_decoder(_cr.credential);
  
    // convert decoded credentials and save it to local storage as a JSON format
    localStorage.setItem('user', JSON.stringify(payload));

    // get necessary data and assign it to a variable
    const { name, email, picture, sub } = payload;

    // lay out your extracted variables and assign it to a key value doc
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      email: email,
      image: picture
    }

    // create a new client and redirect it to home if successful
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true })
    })
  }

  const handleLoginErrors = (err) => {
    console.log("========================\\ ERROR // ==========================");
    console.log(err);
  }

  // hardcoded boilerplate
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo} type='video/mp4' loop controls={false} muted autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>

          <div className='p-1'>
            <img src={myLogo} width='500px' alt="node by node logo" />
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin onSuccess={(credentialResponse) => handleLogin(credentialResponse)} onError={(error) => handleLoginErrors(error)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login