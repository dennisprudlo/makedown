class MarkdownNewlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {number}    lines The amount of newlines to create
	 */
	constructor (text) {
		this.text = text
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		return this.text
			.replace(/\*/g, '\\*')
			.replace(/\_/g, '\\_')
			.replace(/\>/g, '\\>')
			.replace(/\`/g, '\\`')
	}
}

module.exports = MarkdownNewlineComponent;
