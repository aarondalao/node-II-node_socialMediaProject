export const userQuery = (userId) => {
    // get the document that matches with type "user" and an _id of userId
    const query = `*[_type == "user" && _id == "${userId}"]`;

    return query;
}