///**
// * Created by sabrina on 8/6/15.
// */
//Meteor.publishComposite("itemsWithCreator", function (tableName, ids, fields) {
//    check(tableName, String);
//    check(ids, Array);
//    check(fields, Match.Optional(Object));
//
//    return {
//        find: function () {
//            return Items.find({_id: {$in: ids}}, {fields: fields});
//        },
//        children: [
//            {
//                find: function(item) {
//                    return Meteor.users.find({_id: item.creatorID}, {limit: 1, fields: {emails: 1}, sort: {_id: 1}});
//                }
//            }
//        ]
//    };
//});
