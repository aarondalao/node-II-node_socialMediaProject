/*
  notes:

  date created: 15/03/2023
*/

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
import myLogo from '../assets/logoCropped.png';
import { userQuery, fetchUserFromLocalStorage } from '../utils/data';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

const activeSidebarStyling = 'fixed w-1/2 bg-black h-screen overflow-y-auto shadow-md z-20 ease-in-out translate-x-0 duration-300';
const hiddenSidebarStyling = 'fixed w-1/2 bg-black h-screen overflow-y-auto shadow-md z-20 ease-in-out -translate-x-96 duration-300';

const activeSidebarOverlayStyling = "p-2 w-full flex flex-row justify-between items-center shadow-md";
const hiddenSidebarOverlayStyling = "absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 z-10 bg-blackOverlay";


const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const userInfo = fetchUserFromLocalStorage();

  // set up scroll to be at the top of the sidebar
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])




  // retrieve data using a query from data.js
  useEffect(() => {
    // sub is the google id
    const query = userQuery(userInfo?.sub)

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  })

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>

      {/* desktop sidebar */}
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>

      {/* mobile sidebar */}
      <div className='flex md:hidden flex-row'>
      <div className={ toggleSideBar ? hiddenSidebarOverlayStyling : activeSidebarOverlayStyling }>
        {/* <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'> */}
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => {
            setToggleSideBar(!toggleSideBar);
          }
          } />
          <Link to='/'>
            <img src={myLogo} alt="logo" className='w-16' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-16 z-0' />
          </Link>
        </div>

        <div className={toggleSideBar ? activeSidebarStyling : hiddenSidebarStyling}>
          <div className='absolute w-full flex justify-end items-center p-2 '>
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(!toggleSideBar)} />
          </div>
          <Sidebar user={user && user} closeToggle={toggleSideBar} />
        </div>

      </div>

      {/* routes */}
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>

    </div>
  )
}

export default Home