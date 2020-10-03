const fs = require('fs')
const MarkdownTableOfContentsComponent = require('../components/table-of-contents');

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
	 * Resolves the components list into a markdown string
	 * @method resolve
	 * @param  {array} components The list of components
	 * @return {string}           The resolved markdown string
	 */
	toString () {
		return this.components.map(component => {

			//
			// A table of contents needs to be generated
			if (component instanceof MarkdownTableOfContentsComponent) {
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
		fs.writeFileSync(filename, this.toString().trim());

		if (this.options.printResults) {
			console.log(this.toString().trim());
		}
	}
}

module.exports = Makedown;
