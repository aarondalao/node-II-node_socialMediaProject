/*
    notes:
    gather the keys for the project id and tokein in the sanity manager using

    resources:
    https://www.sanity.io/docs/js-client
    https://www.sanity.io/docs/image-url
*/ 

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';



export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID, 
    dataset: 'production',
    apiVersion: '2023-03-11',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_EDITOR_TOKEN
});

// this will quickly generate image urls from Sanity image records
const builder = imageUrlBuilder(client);

// utility function. only applicable if you wish to build an app with an image
export const urlFor = (source) => builder.image(source);

export default client;