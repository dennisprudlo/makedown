class MarkdownEmphasisComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string} content  The content to use for the emphasis text
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
		return `***${ this.content }***`;
	}
}

module.exports = MarkdownEmphasisComponent;
