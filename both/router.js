Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', 'items');
Router.route('/users','users');
//Router.route('/items/:_id', function () {
//    var item = Items.findOne({_id: this.params._id});
//    this.render('item', {data: item});
//}, {
//    name: 'items.show'
//});
//
//Router.route('/', function () {
//    this.render('Home', {
//        data: function () { return Items.findOne({_id: this.params._id}); }
//    });
//});