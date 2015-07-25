Items = new Mongo.Collection("items");
Items.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    description: {
        type: String,
        label: "Description"
    },
    status: {
        type: String,
        label: "Status",
        allowedValues: ['new', 'in design', 'ready for development', 'blocked', 'in development', 'ready for testing', 'in version'],
        autoform: {
            options: [
                {label: "New", value: "new"},
                {label: "In Design", value: "in design"},
                {label: "Ready for Development", value: "ready for development"},
                {label: "Blocked", value: "blocked"}
            ]
        }
    },
    creatorID: {
        type: String,
        label: "Title"
    },
    tags: {
        type: [String],
        label: "Tags"
    }
}));

Items.allow({
    insert: function(userId, doc){
        return doc && doc.creatorID === userId;
    },
    update: function(userId, doc){
        return doc && doc.creatorID === userId;
    }
})