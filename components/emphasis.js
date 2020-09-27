class MarkdownEmphasisComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {array}    components The list of the child components
	 */
	constructor (...components) {
		this.components = components
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		return `***${ makedown.resolve(this.components) }***`;
	}
}

module.exports = MarkdownEmphasisComponent;
