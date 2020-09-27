const components = {
	headline:	require('./components/headline')
}

class Makedown {
	constructor () {
		this.components	= []
		this.options	= {}
	}

	extend (title, Extension) {
		if (/^\s*class/.test(Extension.toString())) {
			Makedown.prototype[title] = (...args) => {
				this.components.push(new Extension(...args))
				return this;
			}
		} else {
			Makedown.prototype[title] = (...args) => {
				this.components.push({ markdown: () => Extension(...args) });
				return this;
			}
		}
	}

	render (options = {}) {
		return this.components.map(component => component.markdown()).join('');
	}
}

const makedown = new Makedown();
for (title in components) {
	makedown.extend(title, components[title]);
}

module.exports = makedown;
