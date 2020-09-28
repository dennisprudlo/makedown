const fs = require('fs')

const markdownComponents = {
	headline:			require('./components/headline'),
	paragraph:			require('./components/paragraph'),
	bold:				require('./components/bold'),
	italic:				require('./components/italic'),
	strike:				require('./components/strikethrough'),
	emph:				require('./components/emphasis'),
	quote:				require('./components/quotation'),
	code:				require('./components/code'),
	newline:			require('./components/newline'),
	link:				require('./components/link'),
	text:				require('./components/text'),
	list:				require('./components/list'),
	table:				require('./components/table'),
	tableOfContents:	require('./components/table-of-contents'),
}

class Makedown {

	/**
	 * Constructs the makedown object and sets the default options
	 * @method constructor
	 * @param  {array}    components An array of markdown components which will be rendered
	 */
	constructor (...components) {
		this.components = components;
		this.options	= {
			/**
			 * The path of the output file
			 * When set null, makedown tries to generate a .md from the .md.js file
			 * @type {string}
			 */
			outputFile: null,

			/**
			 * Whether to print the generated file in the console
			 * @type {Boolean}
			 */
			printResults: false,
		};
	}

	/**
	 * Extends the makedown class with custom markdown-components
	 * @method extend
	 * @param  {string} title    The title of the component
	 * @param  {object} delegate Either a class or a custom function
	 */
	extend (title, delegate) {
		if (/^\s*class/.test(delegate.toString())) {
			Makedown.prototype[title] = (...content) => new delegate(...content);
		} else {
			Makedown.prototype[title] = (...content) => {
				return { toString: () => delegate(...content) };
			};
		}
	}

	/**
	 * Creates a new buider for a readme file
	 * @method make
	 * @param  {object} components A list of markdown component parameters
	 * @return {Makedown}          A makedown instance to create a markdown file
	 */
	make (...components) {
		return new Makedown(...components);
	}

	/**
	 * Resolves the components list into a markdown string
	 * @method resolve
	 * @param  {array} components The list of components
	 * @return {string}           The resolved markdown string
	 */
	resolve (components) {
		return components.map(component => {

			if (component instanceof markdownComponents.tableOfContents) {
				return component.generate(this);
			}

			//
			// Plain strings and numbers are resolved as they are
			if (typeof component === 'string' || typeof component === 'number') return component;

			//
			// Objects with a resolve function will be resolved using this function
			if (typeof component === 'object' && typeof component.toString === 'function') {
				return component.toString();
			}

			//
			// Undefined components are skipped
			return '';
		}).join('');
	}

	/**
	 * Generates a markdown file using the given options
	 * @method render
	 * @param  {object} options An object with object on how to handle the rendering
	 */
	render (options) {

		//
		// Merge the passed in options with the default options
		Object.assign(this.options, typeof options === 'object' ? options : {});

		//
		// Determine the filename
		var filename	= process.mainModule.filename;
		filename		= filename.endsWith('.md.js') ? filename.replace(/\.js$/, '') : './makedown.md';
		filename		= this.options.outputFile != null ? this.options.outputFile : filename;

		//
		// Write the contents
		const content = this.resolve(this.components).trim();
		fs.writeFileSync(filename, content);

		if (this.options.printResults) {
			console.log(content);
		}
	}
}

//
// Extend the makedown class with the predefined/included markdown components
const makedown = new Makedown();
for (title in markdownComponents) {
	makedown.extend(title, markdownComponents[title]);
}

module.exports = makedown;
