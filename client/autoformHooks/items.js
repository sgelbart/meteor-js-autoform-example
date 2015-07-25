var itemHooks = {
    before: {
        insert: function(doc) {
            if(Meteor.userId()){
                doc.creatorID = Meteor.userId();
            }

            return doc;
        }
    },
    docToForm: function(doc) {
        if (_.isArray(doc.tags)) {
            doc.tags = doc.tags.join(", ");
        }
        return doc;
    },
    formToDoc: function(doc) {
        if (typeof doc.tags === "string") {
            doc.tags = doc.tags.split(", ");
        }
        return doc;
    }
}

AutoForm.addHooks('insertItemForm', itemHooks);