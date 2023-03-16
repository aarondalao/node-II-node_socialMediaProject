/*
    Notes:
    date created: 16/03/2023
    
    TODOS:
        1) replace loader to a circle by reading the documentaion of react-loader-spinner

    resources:

    https://mhnpd.github.io/react-loader-spinner/docs/category/components/
*/
import React from 'react';
// import breaking changes: loader from react-loader-spinner does not exist anymore.
// TODO: point 1.
// import Loader from 'react-loader-spinner';
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
    return(
        <div className='flex flex-col justify-center items-center w-full h-full '>
            <Circles
                color="#78af75"
                height={50}
                width={200}
                className='m-5'
                ariaLabel="circles-loading"
                visibility={true}
            />

            <p className='text-lg text-center px-2'>
                {message}
            </p>
        </div>
    );
};

export default Spinner;