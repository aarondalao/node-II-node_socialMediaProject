/*
  Notes:
  not finished

*/
// import packages from npm
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';


// developer created dependencies
// TODO: remove commented dependencies after creating them
// import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
// import MasonryLayout from './MasonryLayout';
// import Spinner from './Spinner'

const activeButtonStyling = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const inactiveButtonStyling = 'bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none';



const UserProfile = () => {
  // variable declarations
  const [user, setUser] = useState();
  const [pins, setpins] = useState();
  const [text, settext] = useState("Created");
  const [activeButton, setactiveButton] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            {/* TODO: replace this bottom part */}
            <img className="w-full h-370 2xl:h-510 shadow-lg object-cover" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="user-profile-photo" />

            <img className="rounded-full w-20 h-20 mt-10 shadow-xl object-cover" src={ user.image } alt="" />
          </div>

        </div>
      </div>


    </div>
  )
}

export default UserProfile