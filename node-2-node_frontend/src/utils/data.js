/*
    notes:
    date created: 16/03/2023

    resources:
    https://www.sanity.io/docs/how-queries-work
*/
export const userQuery = (userId) => {
    // get the document that matches with type "user" and an _id of userId
    const query = `*[_type == "user" && _id == "${userId}"]`;

    return query;
}

export const fetchUserFromLocalStorage = () => {
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    return user;
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset -> {
              url
            }
          },
            _id,
            destination,
            postedBy -> {
                _id,
                userName,
                image
            },
            save[]{
                _key,
                postedBy -> {
                _id,
                userName,
                image
                },
              },
            }`;
    return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
    asset->{
        url
    }
},
        _id,
        destination,
        postedBy->{
    _id,
    userName,
    image
        },
        save[]{
    _key,
    postedBy->{
            _id,
            userName,
            image
    },
    },
} `;


/*
    https://media.istockphoto.com/id/1414981473/photo/futuristic-flight-through-a-digital-line-landscape-blue-dust-particle-abstract-background-3d.jpg?b=1&s=170667a&w=0&k=20&c=nR3IdRbSFibEagWhoCRY_d-WyEJJSv0BLcIsmJJYN5M=
    https://media.istockphoto.com/id/1396812211/photo/photographer-traveler-taking-photo-of-the-beautiful-lake-at-sunset.jpg?b=1&s=170667a&w=0&k=20&c=2kxZjQ8MevI5ynxSE50Ts4lXVLOpiGxGMFvhazDxJaI=
    https://media.istockphoto.com/id/1368262606/photo/tall-powerful-cross-ocean-wave-breaking-during-a-dark-stormy-evening.jpg?b=1&s=170667a&w=0&k=20&c=jJPEMU8rTpHmVzQ41yijTHuokjfWObZrp-Noe8n7F5s=
    https://images.unsplash.com/photo-1557167638-2eef7d9a8cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
    https://images.unsplash.com/photo-1598099297822-396cbd179125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60
    https://images.unsplash.com/photo-1598936573970-76f789c70b81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80
    https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80
    https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60
    https://images.unsplash.com/photo-1622481178814-529856e39ba8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80
*/
export const categories = [
    {
        name: "Landscape",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80",
    },
    {
        name: "Motorcycles",
        image: "https://images.unsplash.com/photo-1582092722992-b2f960bafbfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        name: "Coding",
        image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8RnhTb0hWSk5Iejh8fGVufDB8fHx8&dpr=1&auto=format&fit=crop&w=294&q=60",
    },
    {
        name: "Cars",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    },
    {
        name: "Technology",
        image: "https://media.istockphoto.com/id/1414981473/photo/futuristic-flight-through-a-digital-line-landscape-blue-dust-particle-abstract-background-3d.jpg?b=1&s=170667a&w=0&k=20&c=nR3IdRbSFibEagWhoCRY_d-WyEJJSv0BLcIsmJJYN5M=",
    },
    {
        name: "Portrait",
        image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fFBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Architecture",
        image: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        name: "fitness",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZpdG5lc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "others",
        image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }
];

export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}'] {
        image {
            asset -> {
                url
            }
        },
        _id,
        title,
        about,
        category,
        destination,
        postedBy->{
            _id,
            userName,
            image
        },
        save[]{
            postedBy-> {
                _id,
                userName,
                image
            },
        },
        comments[]{
            comment,
            _key,
            postedBy-> {
                _id,
                userName,
                image
            },
        }
    }`
    return query;
}
// TODO: linked to UserProfiles.jsx
export const userCreatedPinsQuery = (userId) => {
    const query = `$[ _type == 'pin' && userId == '${userId}' ] | order(_createdAt desc){
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            image
        },
        save[]{
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`
    return query;
}

// TODO: linked to UserProfiles.jsx
export const userSavedPinsQuery = (userId) => {
    const query = `[ _type == 'pins %% '${userId}' in save[].userId ] | order(_createdAt desc){
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            image
        },
        save[]{
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`

    return query;
}

export const pinDetailMorePinQuery = (pin) => {
    const query = `*[ _tpe == "pin" && category == '${pin.category} && _id != '${pin._id}'] {
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
}