class MarkdownNewlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {object|number} options The options for the newline command. If set to an integer its used as the lines option
	 */
	constructor (options = 1) {
		this.options = {
			lines: 1
		};

		if (typeof options === 'object') {

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
		return `\n`.repeat(this.options.lines);
	}
}

module.exports = MarkdownNewlineComponent;
