//instantiate
PaginatedSubscriptionHandle = function() {
  this._room_id = Session.get('room_id');
  this._room_id_listeners = new Deps.Dependency();

  this.per_page = Number(Session.get('limit'));
  //todo add limit per room_id
  //todo add analysis
  this._limit = this.per_page;
  this._limit_listeners = new Deps.Dependency();

  this._loaded = 0;
  this._loaded_listeners = new Deps.Dependency();
};

//home room
PaginatedSubscriptionHandle.prototype.home = function() {
  this._limit = this.per_page;
  this._limit_listeners.changed();
};

//change room
PaginatedSubscriptionHandle.prototype.roomChange = function() {
  this._room_id = Session.get('room_id');
  //todo should we really reset limit?
  this._limit = this.per_page;

  this._room_id_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.room_id = function() {
  Deps.depend(this._room_id_listeners);
  return this._room_id;
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

PaginatedSubscriptionHandle.prototype.loadNextPage = function() {
  this._limit += this.per_page;
  this._limit_listeners.changed();
};

PaginatedSubscriptionHandle.prototype.done = function() {
  // XXX: check if subs that are canceled before they are ready ever fire ready?
  // if they do we need to increase loaded by perPage, not set it to limit
  this._loaded = this._limit;
  this._loaded_listeners.changed();
}

Meteor.subscribeWithPagination = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  var handle = new PaginatedSubscriptionHandle();
  var computation = Deps.autorun(function() {
    var ourArgs = _.map(args, function(arg) {
      return _.isFunction(arg) ? arg() : arg;
    });
    var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([
      handle.room_id(), handle.limit(), function() { handle.done(); }
    ]));
    handle.stop = subHandle.stop;
  });
  
  return handle;
}