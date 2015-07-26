Template.users.helpers({
    users: function(){
        return Meteor.users.find();
    }
})