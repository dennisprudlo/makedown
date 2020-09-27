const fs = require('fs')

const components = {
	headline:	require('./components/headline'),
	paragraph:	require('./components/paragraph'),
}

class Makedown {
	constructor () {
		this.options = {
			outputFile: null
		};
	}

	extend (title, delegate) {
		if (/^\s*class/.test(delegate.toString())) {
			Makedown.prototype[title] = (...content) => new delegate(...content);
		} else {
			Makedown.prototype[title] = (...content) => {
				return { markdown: (makedown) => delegate(makedown, ...content) };
			};
		}
	}

	make (...components) {
		this.components = components;
		return this;
	}

	resolve (components) {
		return components.map(component => {
			if (typeof component === 'string' || typeof component === 'number') return component;

			if (typeof component === 'object' && typeof component.markdown === 'function') {
				return component.markdown(this);
			}

			return '';
		}).join('');
	}

	render (options) {
		Object.assign(this.options, typeof options === 'object' ? options : {});
		
		var filename	= process.mainModule.filename;
		filename		= filename.endsWith('.md.js') ? filename.replace(/\.js$/, '') : './makedown.md';
		filename		= this.options.outputFile != null ? this.options.outputFile : filename;

		const content = this.resolve(this.components);
		fs.writeFile(filename, content, result => {
			console.log(`${ filename } created.`);
		});
	}
}

const makedown = new Makedown();
for (title in components) {
	makedown.extend(title, components[title]);
}

module.exports = makedown;
