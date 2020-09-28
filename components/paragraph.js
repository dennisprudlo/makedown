class MarkdownParagraphComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string} content  The content to use for the paragraph
	 * @param  {object} options  The paragraphs options
	 */
	constructor (content, options = {}) {
		this.content = content.trim().replace(/^(\s)+/gm, '');
		this.options = {
			spaceBefore:	false,
			spaceAfter:		true,
		};

		//
		// Merge the passed options with the default options
		Object.assign(this.options, options);
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return `${ this.options.spaceBefore ? '\n\n' : '' }${ this.content }${ this.options.spaceAfter ? '\n\n' : '' }`;
	}
}

module.exports = MarkdownParagraphComponent;
