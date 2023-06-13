/*
  Notes:


*/
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery, fetchUserFromLocalStorage } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'



const activeButtonStyling = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const inactiveButtonStyling = 'bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none';



const UserProfile = () => {
  // variable declarations
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeButton, setactiveButton] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  // const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const User = fetchUserFromLocalStorage();

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  }

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      console.log("===============================================================");
      console.log(data);
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    }
    else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  

  if (!user) return <Spinner mesage="loading profile" />

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
          
            {/* TODO: replace this bottom part */}
            <img className="w-full h-370 2xl:h-510 shadow-lg object-cover" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="user" />

            <img className="rounded-full w-20 h-20 mt-10 shadow-xl object-cover" src={user.image} alt="user" />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-0 right-0 p-2">
            {
              userId === User?.sub && (
                <div>
                  <button type="button" 
                  className="bg-white p-2 rounded-lg cursor-pointer outline-none shadow-md"
                  onClick={logout}
                  >
                    <AiOutlineLogout color="red" fontSize={21} /> 
                  </button>
                  
                </div>

            )
            }
          </div>
        </div>

        <div className="text-center mb-7">
          <button type="button" onClick={(e) => {
            setText(e.target.textContent);
            setactiveButton('created');

          }}
            className={`${activeButton === 'created' ? activeButtonStyling : inactiveButtonStyling}`}
          >
            Created
          </button>
          <button
            type='button'
            onClick={(e) => {
              setText(e.target.textContent);
              setactiveButton('saved');
            }}
            className={`${activeButton === 'saved' ? activeButtonStyling : inactiveButtonStyling}`}
          >

            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {
          pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UserProfile