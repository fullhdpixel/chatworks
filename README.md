# ChatWorks [![Build Status](https://secure.travis-ci.org/Pent/chatworks.png?branch=master)](https://travis-ci.org/Pent/chatworks)

A chat package that you can plugin to any [Meteor](http://meteor.com) project using [Meteorite](https://github.com/oortcloud/meteorite).

## Features
* Timestamps
* Colored lines by name
* Infinite message history

## TODO
* Private Messages
* IP/cookie tied to guest names

## Stack
* [Node](https://github.com/joyent/node)
* [NPM](https://github.com/isaacs/npm)
* [Meteor](https://github.com/meteor/meteor)
* [Meteorite](https://github.com/oortcloud/meteorite)

## Installation
* Pre-Install: [Meteorite](https://github.com/oortcloud/meteorite) to gain the mrt command
* Add ChatWorks to your project with:
```
    mrt add chatworks
```

In your handlebar templates you can just include the template chatworks:

```
    {{>chatworks}}
```

I recommend wrapping the template in a container to set the size of the chat window.

## Testing

```
mrt test-packages chatworks
```

## Notes

Chat handles are coupled to ```Meteor.user.username``` in the accounts package, if no user is logged in it will assign a guest handle.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.1.0/dist/gittip.png)](https://www.gittip.com/JonathanPidgeon/)

## License
* MIT
