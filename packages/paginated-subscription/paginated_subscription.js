//instantiate
PaginatedSubscriptionHandle = function(room_id, per_page) {
  this.room_id = room_id;
  this._room = this.room_id;
  this._room_listeners = new Deps.Dependency();

  this.per_page = per_page;
  this._limit = this.per_page;
  this._limit_listeners = new Deps.Dependency();

  this._loaded = 0;
  this._loaded_listeners = new Deps.Dependency();
};

PaginatedSubscriptionHandle.prototype.room = function() {
  Deps.depend(this._room_listeners);
  return this._room;
};

PaginatedSubscriptionHandle.prototype.changeRoom = function(room_id) {
  this._room = room_id;
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

PaginatedSubscriptionHandle.prototype.allLoaded = function() {
  return this.loaded() === Links.find({}).count();
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

subscribeWithPagination = function (/*name, arguments, room, per_page*/) {
  var args = Array.prototype.slice.call(arguments, 0);
  var room = args.pop();
  var per_page = args.pop();
  var handle = new PaginatedSubscriptionHandle(room, per_page);
  Deps.autorun(function() {
    var ourArgs = _.map(args, function(arg) {
      return _.isFunction(arg) ? arg() : arg;
    });
    var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([
      handle.room(), handle.limit(), function() { handle.done(); }
    ]));
    handle.stop = subHandle.stop;
  });
  return handle;
};