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
        allowedValues: ['new', 'In design', 'ready for development', 'blocked', 'in development', 'ready for testing', 'in version'],
        autoform: {
            options: "allowed",
            capitalize: true
        },
        defaultValue: 'new'
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
    //tags: {
    //    type: [String],
    //    optional: true,
    //    label: "Tags"
    //},
    timelog: {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "timelog.$": {
        type: Object
    },
    "timelog.$.creatorID": {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function () { return Meteor.userId() }
    },
    "timelog.$.amount": {
        type: String
    },
    "timelog.$.date": {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    }
}));

Items.allow({
    insert: function(userId, doc){
        return doc && doc.creatorID === userId;
    },
    update: function(userId, doc){
        return doc && doc.creatorID === userId;
    }
});

Items.helpers({
    creatorName: function () {
        var user = Meteor.users.findOne({_id: this.creatorID});
        return user && user.profile.name;
    }
});

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Items = new Tabular.Table({
    name: "ItemList",
    //pub: "itemsWithCreator",
    collection: Items,
    columns: [
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {data: "creatorID", title: "test"},
        {data: "creatorName()",title: "Creator"},
    ]
});