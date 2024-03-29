/*
    Notes:
    date created: 16/03/2023
*/
import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { categories } from '../utils/data'
import { client } from '../client';
import Spinner from './Spinner';

const CreatPin = ({ user }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState();
    const [fields, setFields] = useState();
    const [category, setCategory] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();

    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];

        // upload assets to sanity
        if (selectedFile.type === 'image/png' ||
            selectedFile.type === 'image/svg' ||
            selectedFile.type === 'image/jpeg' ||
            selectedFile.type === 'image/gif' ||
            selectedFile.type === 'image/tiff') {

            setWrongImageType(false);
            setLoading(true);
            client.assets.upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                .then((document) => {
                    alert("image uploaded")
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                    // console.log(`upload failed: ${error.message}`)
                    alert(`upload failed: ${error.message}`)
                });
        }
        else {
            setLoading(false);
            setWrongImageType(true);
        }
    };

    const savePin = () => {
        if (title && about && destination && imageAsset?._id && category) {
            const document = {
                _type: 'pin',
                title,
                about,
                destination,
                image: {
                    _type: "image",
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id
                    },
                },
                userId: user?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
                category,
            };

            client.create(document).then(() => {
                navigate('/')
            });

        }
        else {
            setFields(true);

            setTimeout(
                () => {
                    setFields(false);
                },
                2000,
            );
        }
    };

    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {
                fields && (
                    <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
                        some of the fields are missing or blank. please fill them thanks.
                    </p>
                )
            }
            <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
                <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
                    <div className='flex justify-center items-center flex-col borer-2 border-dotted border-gray-300 p-3 w-full h-420'>

                        {
                            loading && (
                                < Spinner />
                            )
                        }
                        {
                            wrongImageType && (
                                <p>
                                    It&apos;s wrong file type.
                                </p>
                            )
                        }
                        {
                            !imageAsset ? (
                                // eslint-disable-next-line jsx-a11y/label-has-associated-control

                                <label>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="font-bold text-2xl">
                                                <AiOutlineCloudUpload />
                                            </p>
                                            <p className='text-lg'>
                                                Click to upload
                                            </p>
                                        </div>

                                        <p className='mt-32 text-gray-400'>
                                            Recommended: Use High Quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20 Mb
                                        </p>
                                    </div>
                                    <input type="file"
                                        name='upload-image'
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            ) : (
                                <div className="relative h-full">
                                    <img src={imageAsset?.url} alt="uploaded-asset" className='h-full w-full' />
                                    <button type="button"
                                        className='absolute b-3 r-3 p-3 rounded-fuyll bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                        onClick={() => setImageAsset(null)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full" >
                    <input className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
                        type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="what's your pin called?"
                        />
                    {user && (
                        <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg" >
                            <img className="w-10 h-10 rounded-full" src={user.image} alt="user-profile" />
                            <p className="font-bold">
                                {user.userName}
                            </p>
                        </div>
                    )}

                    <input className="p-2 border-gray-200 border-b-2 sm:text-3xl text-2xl outline-none"
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="describe what your pin is about..."
                    />
                    <input className='p-2 border-gray-200 border-b-2 sm:text-3xl text-2xl outline-none'
                        type="url"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="can you show me where you find this?"
                    />
                    <div className="flex flex-col" >
                        <div className="" >
                            <p className="mb-2 font-semibold text:lg sm:text-xl">
                                Choose Pin Category
                            </p>
                            <select className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer" name="" id=""
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="others" className="sm:text-bg bg-white" >Select Category</option>
                                {
                                    categories.map((item) => (
                                        <option className="text-base border-0 outline-none capitalize bg-white text-black" value={item.name} key={item.name}> {item.name} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex justify-end items-end mt-5" >
                            <button
                                type="button"
                                onClick={savePin}
                                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none" >
                                Save this Pin!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatPin;