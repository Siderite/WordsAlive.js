(function () {
	var global = this;
	if (!global.WordsAlive)
		throw "This is an addon for WordsAlive. Please load it first";
	WordsAlive.addons.word2class = {
		name : 'Each word gets its class',
		getManager : function (word) {
			return this;
		},
		getClasses : function (word) {
			return ['w-' + word];
		},
		init : function () {}
	};
})();