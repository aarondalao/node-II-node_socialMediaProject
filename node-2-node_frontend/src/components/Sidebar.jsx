/*
  notes:
  

  find more ways to customize this

  TODOS:
    1) mobile sizing is way too big. adjust this
*/
import React from 'react'
import { NavLink, Link } from 'react-router-dom';

// customize this
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/logoCropped.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const categories = [
  { name: "Motorcycles" },
  { name: "Landscape" },
  { name: "Coding" },
  { name: "Portrait" },
  { name: "Technology" },
  { name: "Cars" },
  { name: "Fitness" },
  { name: "Others" }
];

const Sidebar = ({ user, closeToggle }) => {

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(!closeToggle);
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 max-w-400 hide-scrollbar ">
      <div className='flex flex-col'>

        <Link to="/" className='flex p-5 gap-2 my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
          <img src={logo} alt="logo" className='w-full' />
        </Link>

        <div className='flex flex-col gap-5'>
          <NavLink to="/" onClick={handleCloseSidebar} className={(isActive) => isActive ? isActiveStyle : isNotActiveStyle}>
            <RiHomeFill />
            Home
          </NavLink>

          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
          {
            categories.slice(0, categories.length - 1).map((category) => (

              <NavLink
                to={`/category/${category.name}`}
                onClick={handleCloseSidebar} 
                className={( {isActive} ) => isActive ? isActiveStyle : isNotActiveStyle}
                key={category.name}
              >
                {category.name}
              </NavLink>
            ))
          }
        </div>
      </div>

      {/* && refers to conditional rendering. this emulates if statements as this creates distinct components that depends of the state of your logic/application */}
      { user && (
        <Link
        to={ `user-profile/${user._id}` }
        className = "flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
        onClick = { handleCloseSidebar }
        >
          <img src={ user.image } alt="user-profile" className='w-10 h-10 z-0 rounded-full' />
          <p> { user.userName } </p>
          <IoIosArrowForward/>
        </Link>
      )}
    </div>

  )
}

export default Sidebar