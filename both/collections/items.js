Items = new Mongo.Collection("items");
Items.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    content: {
        type: String,
        label: "Description"
    }
}));