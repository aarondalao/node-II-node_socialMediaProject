/*
    Date created: 21/03/2023
    Notes:

    TODO:
    1) comments must show in pin detail right after submitting it. note: comment is indeed working and backend is receiving incomming comment inserts
    2) loading of similar pins is at the moment not working. similar tags should appear.
    3) container for the  photos needs to be unifor despite having different photo sizes
    4) zoom in functionality could be nice to have.
*/
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import { MdDownloadForOffline } from 'react-icons/md';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'


const PinDetail = ({ user }) => {
    const { pinId } = useParams();
    const [pins, setPins] = useState();
    const [pinDetail, setPinDetail] = useState();
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);


    const fetchPinDetails = () => {
        
    } 

    useEffect(() => {
        // fetchPinDetails();   
        
        const query = pinDetailQuery(pinId);

        if (query) {
            client.fetch(`${query}`).then((data) => {
                setPinDetail(data[0]);

                // TODO: remove this before deploying
                console.log(data);

                if (data[0]) {

                    // TODO: find another appropriate name for this
                    const query1 = pinDetailMorePinQuery(data[0]);
                    client.fetch(query1).then((result) => {
                        setPins(result);
                    });
                }
            });
        }
    }, [pinId]);

    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client.patch(pinId)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment('');
                    setAddingComment(false);
                });
        }
    };

    if (!pinDetail) {
        return (
            <Spinner message='Showing pin. hang on' />
        );
    }

    return (
        <>
        {
            pinDetail && (
            <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxWidth: "1500px", borderRadius: '32px' }}>

                <div className=' flex justify-cenbter items-center md:items-start flex-initial'>
                    <img className="rounded-t-3xl rounded-b-lg " src={(pinDetail?.image && urlFor(pinDetail?.image).url())} alt="user-post" />
                </div>

                <div className="w-full p-5 flex-1 xl:min-w-620">
                    
                    <div>
                        <h1 className="text-4xl font-bold break-words mt-3">
                            {pinDetail.title}
                        </h1>
                        <p className="m t-3">
                            {pinDetail.about}
                        </p>
                    </div>
                    <div className="flex items-center justify-between my-5">
                        <div className="flex gap-2 items-center">
                            <a href={`${pinDetail.image.asset.url}?dl=`} download className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacituy-75 hover:opacity-100">
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
                            {pinDetail.destination.slice(8)}
                        </a>
                    </div>

                    <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                        <img src={pinDetail?.postedBy.image} alt="user-profile" className="w-10 h-10" />
                        <p className="font-bold">
                            {pinDetail?.postedBy?.userName}
                        </p>
                    </Link>
                    <h2 className='mt-5 text-2xl'>
                        Comments
                    </h2>
                    <div className='max-h-370 overflow-y-auto'>
                        {
                            pinDetail?.comments?.map((item) => 
                                (
                                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={ item.comment }>
                                    <img src={item.postedBy?.image} alt="user-profile" 
                                        className='w-10 h-10 rounded-full cursor-pointer'
                                    />
                                    <div className="flex flex-col">

                                        <p className="font-bold">
                                            { item.postedBy?.userName }
                                        </p>
                                        <p className="">
                                            { item.comment }
                                        </p>
                                    </div>    
                                </div>
                            ))}
                    </div>
                    <div className="flex flex-wrap mt-6 gap-3">
                    
                        <Link to={ `user-profile/${user?._id}` }>
                            <img src={user?.image} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer" />
                        </Link>
                        <input 
                        className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                        type="text"
                        placeholder='Add a comment'
                        value={comment}
                        onChange={ (e) => {
                            setComment(e.target.value)
                        }} 

                        />
                        <button type='button' 
                        className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
                        onClick={addComment}>
                            { addingComment ? 'Please wait...' : 'Post' }
                        </button>
                    </div>
                </div>
            </div>
        )}
        {
            pins?.length > 0 && (
                <h2 className="text-center font-bold text-2xl mt-8 mb-4">
                    More like this
                </h2>
                )
        }
        {
            pins ? (
                
                <div className="mt-6">
                <MasonryLayout className="mt-5" pins={pins} />
                </div>
            ) : (
                <div className="mt-6">
                <Spinner className="mt-5" message="Loading more pins. grab a coffee for now... "/>
                </div>
            )
        }
        </>
    );
};

export default PinDetail;