/*
    Notes:
    date created: 16/03/2023
*/
import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin'

const breakpointColumnsObject = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const MasonryLayout = ( { pins } ) => {
    <Masonry className='flex animate-slide-fwd' breakpointCols={ breakpointColumnsObject }>
        { pins?.map( (pin) => <Pin key={ pin._id } pin={ pin } className="w-max" />) }
    </Masonry>
}

export default MasonryLayout;