# ChatWorks [![Build Status](https://secure.travis-ci.org/Pent/chatworks.png?branch=master)](https://travis-ci.org/Pent/chatworks)

Add chat to any [Meteor](http://meteor.com) project.

## Features
* Timestamps
* Colored lines by name
* Infinite message history
* Sessions saved by IP
* Chat rooms... possible

## TODO
* Private Messages

## Installation
* Pre-Install: [Meteorite](https://github.com/oortcloud/meteorite) to gain the mrt command

* Use an existing Meteor project or create a new one from the command-line using:
```
    meteor create yourchatapp
    cd yourchatapp
```

* Add ChatWorks to your project with:
```
    mrt add chatworks
```

* Inside your body or handlebar template you just include the template chatworks:

```
    {{> chatworks}}
```

* Tip: Wrap the template in a css styled container to set the width and height of the chat window.
```
    <div style="width: 100%; height: 300px;">
      {{> chatworks}}
    </div>
```

## Testing

```
mrt test-packages chatworks
```

## Notes

Chat handles are coupled to ```Meteor.user.username``` in the accounts package, if no user is logged in it will assign a guest handle.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.1.0/dist/gittip.png)](https://www.gittip.com/JonathanPidgeon/)

## License
* MIT
