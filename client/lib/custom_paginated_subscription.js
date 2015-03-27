PaginatedSubscriptionHandle = function(room, per_page) {
    this._room = room;
    this._room_listeners = new Deps.Dependency();

    this.per_page = per_page;
    this._limit = this.per_page;
    this._limit_listeners = new Deps.Dependency();

    this._loaded = per_page;
    this._loaded_listeners = new Deps.Dependency();
};

PaginatedSubscriptionHandle.prototype.room = function() {
    Deps.depend(this._room_listeners);
    return this._room;
};

PaginatedSubscriptionHandle.prototype.changeRoom = function(room) {
    this._room = room;
    this._limit = this.per_page;
    this._limit_listeners.changed();
    this._room_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.loaded = function() {
    Deps.depend(this._loaded_listeners);
    return this._loaded;
};

PaginatedSubscriptionHandle.prototype.limit = function() {
    Deps.depend(this._limit_listeners);
    return this._limit;
};

PaginatedSubscriptionHandle.prototype.ready = function() {
    return this.loaded() === this.limit();
};

PaginatedSubscriptionHandle.prototype.loadMore = function(more) {
    this._limit += more;
    this._limit_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.loadNextPage = function() {
    this._limit += this.per_page;
    this._limit_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.done = function() {
    this._loaded = this._limit;
    this._loaded_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.reset = function() {
    this._limit = this.per_page;
    this._limit_listeners.changed();
}

subscribeWithPagination = function( /*name, arguments, room, per_page*/ ) {
    var args = Array.prototype.slice.call(arguments, 0);
    var per_page = args.pop();
    var room = args.pop();
    var handle = new PaginatedSubscriptionHandle(room, per_page);
    Deps.autorun(function() {
        var ourArgs = _.map(args, function(arg) {
            return _.isFunction(arg) ? arg() : arg;
        });
        var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([
            handle.room(), handle.limit(),
            function() {
                handle.done();
            }
        ]));
        handle.stop = subHandle.stop;
    });
    return handle;
};
