(function () {
	var global = this;
	if (!global.WordsAlive)
		throw "This is an addon for WordsAlive. Please load it first";
	if (!global.jQuery)
		throw "This addon needs jQuery";
	var isExplosive = /^(explosion|explosions|explode|explodes|exploding|exploded|explosive|dynamite|tnt|c4|bomb)$/i;
	var Particle = function (x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color || 'white';
		this.speed = 0;
		this.direction = 0;
		this.initialized = false;
	}
	Particle.radius = 2;
	Particle.maxSpeed = 5;
	Particle.maxTime = 50;
	Particle.numberOfParticles = 50;
	Particle.prototype = {
		move : function () {
			if (!this.initialized)
				this.init();
			this.x += this.speed * Math.cos(this.direction);
			this.y += this.speed * Math.sin(this.direction);
			this.redraw();
		},
		remove : function () {
			if (!this.elem)
				return;
			this.elem.remove();
			this.elem = null;
			this.initialized = false;
		},
		init : function () {
			this.initialized = true;
			this.elem = $('<div></div>');
			this.elem.css({
				position : 'absolute',
				width : Particle.radius,
				height : Particle.radius,
				backgroundColor : this.color
			});
			this.elem.appendTo('body');
		},
		redraw : function () {
			this.elem.css({
				left : this.x,
				top : this.y
			});
		}
	};

	WordsAlive.addons.explosion = {
		name : 'Explosion',
		colors : {},
		intervalSpeed : 50,
		getManager : function (word) {
			return isExplosive.test(word) ? this : null;
		},
		getClasses : function (word) {
			return ['explosive'];
		},
		init : function (newElems) {
			var self = this;
			$('.explosive',newElems)
			.mouseenter(function () {
				var explosion = $(this).data('explosion');
				if (explosion && explosion.count > 0)
					return;
				explosion = self.startExplosion(this);
				$(this).data('explosion', explosion);
			});
		},
		startExplosion : function (elem) {
			var self = this;
			elem = $(elem);
			var color = elem.css('color');
			var ofs = elem.offset();
			ofs.left += elem.width() / 2;
			ofs.top += elem.height() / 2;
			var particles = [];
			for (var i = 0; i < Particle.numberOfParticles; i++) {
				var particle = new Particle(ofs.left, ofs.top, color);
				particle.direction = Math.random() * Math.PI * 2;
				particle.speed = Math.random() * Particle.maxSpeed;
				particles.push(particle);
			}
			var explosion = {
				interval : null,
				particles : particles,
				count : Particle.maxTime
			};
			explosion.interval = setInterval(function () {
					particles.forEach(function (p) {
						p.move();
					});
					explosion.count--;
					if (explosion.count <= 0)
						self.stopExplosion(explosion);
				}, this.intervalSpeed);
			return explosion;
		},
		stopExplosion : function (explosion) {
			if (explosion.interval)
				clearInterval(explosion.interval);
			explosion.interval = null;
			explosion.particles.forEach(function (p) {
				p.remove();
			});
			explosion.particles = [];
		}
	};
})();