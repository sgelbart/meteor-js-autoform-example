Items = new Mongo.Collection("items");
Items.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            rows: 10
        }
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
    assigneeId: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "select",
            options: function() {
                return _.map(Meteor.users.find({}).fetch(), function(user) {
                    return {
                        label: user.profile.name,
                        value: user._id
                    };
                });
            }
        }
    },
    creatorID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function () { return Meteor.userId() }
    },
    tags: {
        type: [String],
        optional: true,
        label: "Tags"
    },
    timelog: {
        type: [String],
        optional: true,
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