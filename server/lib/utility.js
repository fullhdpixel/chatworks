Object.defineProperty( Array.prototype, 'random', {
	value : function () {
		return this[ Math.floor(Math.random() * this.length) ];
	},

	configurable : true,
	writable : true
});

fourohfour = [
  '(ﾉಥДಥ)ﾉ︵┻━404━┻･/'
  ,'(ノ ゜Д゜)ノ ︵ ┻━404━┻'
  ,'(╯°□°)╯︵ ┻━404━┻ '
  ,'ʕノ•ᴥ•ʔノ ︵ ┻━404━┻'
]