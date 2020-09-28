class MarkdownNewlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string} content  The content to use for the plaintext component
	 */
	constructor (content) {
		this.content = content;
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return this.content
			.replace(/\*/g, '\\*')
			.replace(/\_/g, '\\_')
			.replace(/\>/g, '\\>')
			.replace(/\~/g, '\\~')
			.replace(/\`/g, '\\`')
	}
}

module.exports = MarkdownNewlineComponent;
