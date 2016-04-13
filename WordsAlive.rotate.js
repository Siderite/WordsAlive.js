(function () {
	var global = this;
	if (!global.WordsAlive)
		throw "This is an addon for WordsAlive. Please load it first";
	if (!global.jQuery)
		throw "This addon needs jQuery";
	var isRotate = /^(rotate|rotation|rotating|rotated|rotary|rotates)$/i;
	WordsAlive.addons.rotate = {
		name : 'Rotate',
		colors : {},
		intervalSpeed : 50,
		angularSpeed : 10,
		getManager : function (word) {
			return isRotate.test(word) ? this : null;
		},
		getClasses : function (word) {
			return ['liverotate'];
		},
		init : function (newElems) {
			var self = this;
			$('.liverotate',newElems)
			.mouseenter(function () {
				var rotation = $(this).data('rotation');
				if (rotation && rotation.count > 0)
					return;
				rotation = self.startRotation(this);
				$(this).data('rotation', rotation);
			})
			.mouseout(function () {
				var rotation = $(this).data('rotation');
				if (rotation)
					self.stopRotation(rotation);
				$(this).removeData('rotation');
			});
		},
		startRotation : function (elem) {
			var self = this;
			elem = $(elem);
			var rotation = {
				interval : null,
				angle : 0,
				elem : elem
			};
			rotation.interval = setInterval(function () {
					elem.css({
						transform : 'rotate(' + rotation.angle + 'deg)',
						display : 'inline-block'
					});
					rotation.angle += self.angularSpeed;
					if (rotation.angle >= 360)
						rotation.angle = rotation.angle % 360;
				}, this.intervalSpeed);
			return rotation;
		},
		stopRotation : function (rotation) {
			if (rotation.interval)
				clearInterval(rotation.interval);
			rotation.interval = null;
			rotation.elem.css({
				'transform' : '',
				'display' : ''
			});
		}
	};
})();