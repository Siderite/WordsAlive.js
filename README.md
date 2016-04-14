# WordsAlive.js
Javascript library adds functionality to each specific word on a page

Use like this:
- load WordsAlive.js
- any of the addons (some require jQuery)
- add extra CSS or code based on the classes defined by the addons
- execute new WordsAlive().run(root) (you can omit root and it will use the entire document)

This library will take all text nodes on the page, find letter only words and check them against the installed addons. If tagged, the words will be replaced with spans with specific class names. The addon or yourself can then add functionality to those spans.

The addons defined so far are:
 - word2class - turns each word into a span with a class name w-[word]
 - common - adds class 'common' to the first 1000 most common English words (and/or followed by suffixes s, es, ed, ing, ly, y)
 - colors - adds class color_[word] to words that are the same with the color names defined in HTML. The addon also creates a style that colors each class based on the color (so the word red will appear red)
 - explosion - adds an explosion effect to words like explosion, tnt, c4, bomb, etc.
 - rotate - adds a rotating effect to words like rotate, rotating, etc.
 
 Create your own addon
 All you need to do is add a new object as a property of WordsAlive.addons. The object needs to have defined a getManager(word) function and an init(newElems) function. All addons defined so far return the addon object from getManager if the conditions are met. A word manager needs a function getClasses(word) that returns an array of class names for the span element of the word. The init function of the addon will only provide additional functionality on the new span elements created. Is is customary for an addon to also have a name property, even if it is not used at this time.
 
## Examples:

```javascript
 WordsAlive.addons.sample={
   name:'Sample addon makes all "sample" words be wrapped in spans with class name "sample_class"',
   getManager:function(word) { return word=='sample'?this:null; },
   getClasses:function(word) { return ['sample_class'];},
   init:function(newElems) { console.log(newElems); }
 };
```
 
 Same functionality, with a different manager object:
 
```javascript
 WordsAlive.addons.sample = {
	name : 'Sample addon makes all "sample" words be wrapped in spans with class name "sample_class"',
	getManager : function (word) {
		if (word == 'sample') return {
			getClasses : function (word) { return ['sample_class'];	},
		};
		return null;
	},
	init : function (newElems) { console.log(newElems); }
};
```
