export default {
    name: "pin",
    title: "Pin",
    type: "document",
    fields: [
        // pin title object
        {
            name: "title",
            title: "title",
            type: "string"
        },
        {
            name: "about",
            title: "About",
            type: "string"
        },
        {
            name: "destination",
            title: "Destination",
            type: "url"
        },
        {
            name: "category",
            title: "Category",
            type: "string"
        },
        {
            name: "images",
            title: "Images",
            type: "image",
            options: {
                hotspot: true,
            }
        },
        {
            name: "userId",
            title: "UserId",
            type: "string"
        },
        {
            name: "postedBy",
            title: "PostedBy",
            type: "postedBy"
        },
        {
            name: "save",
            title: "Save",
            type: "array",
            of: [
                {
                    type: "save"
                }
            ]
        },
        {
            name: "comments",
            title: "Comments",
            type: "array",
            of: [
                {
                    type: "comment"
                }
            ]
        },

    ]
}