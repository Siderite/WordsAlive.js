(function () {
	var global = this;
	if (!global.WordsAlive)
		throw "This is an addon for WordsAlive. Please load it first";
	var isColor = /^(aliceblue|antiquewhite|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|cyan|darkgoldenrod|darkgreen|darkkhaki|darkolivegreen|darkorange|darkorchid|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrod|lightgoldenrodyellow|lightgray|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslate|lightslategray|lightsteelblue|lightyellow|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumviolet|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|thistle|tomato|turquoise|violet|violetred|wheat|white|whitesmoke|yellow|yellowgreen)$/i;
	WordsAlive.addons.colors = {
		name : 'Colors',
		colors : {},
		getManager : function (word) {
			if (isColor.test(word)) {
				this.colors[word] = true;
				return this;
			}
			return null;
		},
		getClasses : function (word) {
			return ['color_' + word];
		},
		init : function () {
			var colors = Object.keys(this.colors);
			var style = document.createElement('style');
			var s = '';
			var background = 'white';
			colors.forEach(function (color) {
				s += '.color_' + color + ' { color:' + color + '; text-shadow: 0 0 1px ' + background + ' }\r\n';
			});
			style.innerHTML = s;
			(document.head || document.body).appendChild(style);
		}
	};
})();