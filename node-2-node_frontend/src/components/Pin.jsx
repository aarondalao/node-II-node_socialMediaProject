/*
  Notes:
  date created: 16/03/2023

  1, [2,3,1] -> [1].length -> 1 -> !1 -> false -> !false -> true
  4, [2,3,1] -> [].length -> 0 -> !0 -> true -> !true -> false

  appendix:
  I -> optional chaining operator. this enables me to read the value of a property located deep within a chain of connected objects without 
        having to check that each reference in the chain is valid.
     -> this operator, ei, ?. , is like . chaining operator with the ability to still be valid even if that variable does not exist. 
        it will return a value of undefined instead of throwing an exception.   
*/


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchUserFromLocalStorage } from '../utils/data';


const Pin = ({ pin }) => {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;

  // almost like sharedPreference in Flutter. a key:value local storage solution
  // const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const user = fetchUserFromLocalStorage();

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  // appendix I : variable with a question mark ( pin?.save?. )
  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  // 

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client.patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.sub,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        })
    }
  };

  return (
    <div className='m-2'>
      <div onMouseEnter={() => setPostHovered(true)} onMouseLeave={() => setPostHovered(false)} onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-xl overflow-hidden transition-all duration-500 ease-in-out">
        {
          image && (
            <img className="rounded-xl w-full" src={(urlFor(image).width(250).url())} alt="user-post" />
          )
        }

        {/* this shows up when mouse hovered the photo */}
        {postHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{ height: '100%' }}>
            <div className='flex items-center justify-between'>
              {/* download button  */}
              <div className='flex gap-2'>
                <a href={`${image?.asset?.url}?dl=`} download onClick={(e) => { e.stopPropagation(); }}
                  className="bg-white w-9 h-9 p-2 rounded-xl flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 
                  hover:shadown-md outline-none">
                  <MdDownloadForOffline />
                </a>
              </div>

              {/* save button */}
              {alreadySaved?.length !== 0 ? (
                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-xl 
                  hover:shadow-md outline-none'>
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button type='button' onClick={(e) => { e.stopPropagation(); savePin(_id); }} className="bg-red-500 opacity-70 hover:opacity-100 text-white 
                  font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {pin?.save?.length}  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
            {/* origin photo destination link */}
              {
                destination?.slice(8).length > 0 ? (
                <a href={destination}
                  target="_blank"
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-xl opacity-70 hover:opacity-100 hover:shadow-md'
                  rel='noreferrer'
                >
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination?.slice(8, 20) : destination.slice(8)}...
                </a>
              ) : undefined
              }

              {/* delete button */}
              {
                postedBy?._id === user?.sub && (
                  <button type="button" onClick={(e) => {
                    e.stopPropagation(); deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-xl w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                  <AiTwotoneDelete/>
                  </button>
                )
              }
            </div>
          </div>
        )
        }
      </div>

      {/* user profile cards */}
      <Link to= {`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img className="w-8 h-8 rounded-full object-cover" 
        src={postedBy?.image} 
        alt="user-profile" />
        <p className ="font-semibold capitalize">{ postedBy?.userName }</p>
      </Link>
    </div>
  );
};

export default Pin;