class MarkdownCodeComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}        code    The source code
	 * @param  {object|string} options The code options. If set to a string its used as the language option
	 */
	constructor (code, options = {}) {
		this.code		= code;
		this.options	= {
			/**
			 * The language identifier to use for syntax highlighting
			 * @type {string|null}
			 */
			language:	null,

			/**
			 * Forces the display of either an inline or a block component
			 * Possible values: null, "inline", "block"
			 * @type {string|null}
			 */
			force:		null,
		}

		if (typeof options === 'string') {

			//
			// Set the specified code language
			this.options.language = options;
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
	toString() {
		var renderBlock = this.code.includes('\n') || this.options.language !== null;
		if (this.options.force !== null) {
			if (this.options.force == 'inline') renderBlock = false;
			else if (this.options.force == 'block') renderBlock = true;
		}

		if (renderBlock) {
			return `\`\`\`${ this.options.language !== null ? this.options.language : '' }\n${ this.code }\n\`\`\`\n`;
		} else {
			return `\`${ this.code }\``;
		}
	}
}

module.exports = MarkdownCodeComponent;
