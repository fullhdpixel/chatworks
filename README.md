# ChatWorks
A chat package that you can plugin to any [Meteor](http://meteor.com) project using [Meteorite](https://github.com/oortcloud/meteorite).

## The Features
* Timestamps
* Colored lines by name
* Infinite message history

## TODO
* Rooms
* Private Messages
* IP/cookie tied to guest names

## The Stack
* [Node](https://github.com/joyent/node)
* [NPM](https://github.com/isaacs/npm)
* [Meteor](https://github.com/meteor/meteor)
* [Meteorite](https://github.com/oortcloud/meteorite)

## The Installation
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

## The Notes

Chat handles are coupled to ```Meteor.user.username``` in the accounts package, if no user is logged in it will assign a guest handle.

I'd love to see projects using this in the wild. Please let me know if you use this!

## The License
* MIT
