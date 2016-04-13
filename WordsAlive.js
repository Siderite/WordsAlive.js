(function () {
	var global = this;
	WordsAlive = function () {};
	WordsAlive.addons = {};
	WordsAlive.prototype = {
		getNewNodes : function (root) {
			var walker = document.createTreeWalker(
					root||document.body,
					NodeFilter.SHOW_TEXT,
					null,
					false);
			var node;
			var nodes = [];
			while (node = walker.nextNode()) {
				var val = node.nodeValue;
				if (!val || !val.replace(/\s+/g, ''))
					continue;
				var parent = $(node.parentNode);
				if (!parent.is(':visible'))
					continue;
				if (parent.is('.wordsAlive')||parent.closest('.wordsAlive').length)
					continue;
				nodes.push(node);
			}
			return nodes;
		},
		getManagers : function (word) {
			if (!word)
				return;
			var managers = [];
			Object.keys(WordsAlive.addons).forEach(function (key) {
				var addon = WordsAlive.addons[key];
				var manager = addon.getManager(word);
				if (manager)
					managers.push(manager);
			});
			return managers;
		},
		run : function (root) {
			var self = this;
			var nodes = this.getNewNodes(root);
			var newElems = [];
			nodes.forEach(function (node) {
				var val = node.nodeValue;
				var splits = val.split(/[\r\n]+/g);
				var changed = false;
				for (var i = 0; i < splits.length; i++) {
					splits[i] = splits[i].replace(/[a-z]+/ig, function (m) {
							var word = m.toLowerCase();
							var wordManagers = self.getManagers(word);
							if (!wordManagers || !wordManagers.length)
								return m;
							changed = true;
							var classes = {};
							for (var j = 0; j < wordManagers.length; j++) {
								var arr = wordManagers[j].getClasses(word) || [];
								arr.forEach(function (cls) {
									classes[cls] = true;
								});
							}
							return '<span class="' + Object.keys(classes).join(' ') + '">' + m + '</span>';
						});
				}
				if (!changed)
					return;
				var newElem = document.createElement('span');
				newElem.className = 'wordsAlive';
				newElem.innerHTML = splits.join('\r\n');
				node.parentNode.replaceChild(newElem, node);
				newElems.push(newElem);
			});
			this.initializeAddons(newElems);
		},
		initializeAddons(newElems) {
			Object.keys(WordsAlive.addons).forEach(function (key) {
				var addon = WordsAlive.addons[key];
				addon.init(newElems);
			});
		}
	};
	global.WordsAlive = WordsAlive;
})();