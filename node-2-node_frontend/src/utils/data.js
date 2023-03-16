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

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title mach '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ] {
        image {
            asset ->{
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
};

export const feedQuery = `[_type == "pin"] | order(_createdAt desc) {
    image {
        asset-> {
            urls
        }
    },
    _id,
    destination,
    postedBy-> {
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy-> {
            _id,
            userName,
            image
        },
    },
}`;