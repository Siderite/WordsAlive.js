(function () {
	var global = this;
	if (!global.WordsAlive)
		throw "This is an addon for WordsAlive. Please load it first";
	if (!global.jQuery)
		throw "This addon needs jQuery";
	var isRadioactive = /^(radioactive|irradiate|irradiated|irradiates|irradiating|uranium|plutonium|atomic)$/i;
	WordsAlive.addons.radioactive = {
		name : 'Radioactive',
		intervalSpeed : 150,
		minGlowRadius : 2,
		maxGlowRadius : 10,
		color : 'green',
		getManager : function (word) {
			return isRadioactive.test(word) ? this : null;
		},
		getClasses : function (word) {
			return ['radioactive'];
		},
		init : function (newElems) {
			var self = this;
			$('.radioactive', newElems)
			.mouseenter(function () {
				var elem = $(this);
				var radioactive = elem.data('radioactive');
				if (radioactive)
					return;
				radioactive = {
					radius : 0,
					direction : 1,
					interval : null,
					originalTextShadow : elem.css('text-shadow')
				}
				radioactive.interval = setInterval(function () {
						elem.css({
							textShadow : '0 0 ' + radioactive.radius + 'px ' + self.color
						});
						radioactive.radius += radioactive.direction;
						if (radioactive.radius >= self.maxGlowRadius) {
							radioactive.direction = -1;
							radioactive.radius = self.maxGlowRadius;
						} else if (radioactive.radius <= self.minGlowRadius) {
							radioactive.direction = 1;
							radioactive.radius = self.maxGlowRadius;
						}
					}, self.intervalSpeed);
				$(this).data('radioactive', radioactive);
			})
			.mouseout(function () {
				var elem = $(this);
				var radioactive = elem.data('radioactive');
				if (radioactive) {
					if (radioactive.interval)
						clearInterval(radioactive.interval);
					elem.css({
						textShadow : radioactive.originalTextShadow
					});
				}
				elem.removeData('radioactive');
			});
		}
	};
})();