class MarkdownHeadlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}        content  The content to use for the headline
	 * @param  {object|number} options  The headline options. If set to an integer its used as the indentation option
	 */
	constructor (content, options) {
		this.content = content;
		this.options = {
			indentation:	1,
			plainText:		content
		};

		if (!isNaN(options) && Number.isInteger(options)) {

			//
			// map the indentation level between 1 and 6
			this.options.indentation = Math.min(6, Math.max(1, options));
		} else if (typeof options === 'object') {

			//
			// Merge the passed options with the default options
			Object.assign(this.options, options);
		}
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return `${ '#'.repeat(this.options.indentation) } ${ this.content }\n`;
	}
}

module.exports = MarkdownHeadlineComponent;
