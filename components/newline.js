class MarkdownNewlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {number}    lines The amount of newlines to create
	 */
	constructor (lines = 1) {
		this.lines = lines
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		return `\n`.repeat(this.lines);
	}
}

module.exports = MarkdownNewlineComponent;
