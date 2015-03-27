Meteor.publish('chatworksMessages', function(room, limit) {
    check(room, String);
    check(limit, Number);
    var count = ChatworksMessages.find({
        room: room
    }).count();
    //calculate boundary: the messages that we pull from the end of the collection
    boundary = count - 50;
    return ChatworksMessages.find({
        room: room
    }, {
        sort: {
            ts: 1
        },
        skip: boundary,
        fields: {
            handle: 1,
            message: 1,
            ts: 1
        }
    });
});

Meteor.publish('chatworksRooms', function() {
    return ChatworksRooms.find();
});

Meteor.publish('chatworksUsers', function(ts) {
    check(ts, Number);
    return ChatworksUsers.find({
        lastSeen: {
            $gte: ts
        }
    }, {
        fields: {
            handle: 1
        }
    });
});
