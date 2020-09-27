class MarkdownHeadlineComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {number}   indentation The headline indentation level (1-6)
	 * @param  {array}    components  The list of the child components
	 */
	constructor (indentation = 1, ...components) {
		if (isNaN(arguments[0]) || !Number.isInteger(arguments[0])) {
			this.indentation	= 1
			this.components		= [indentation].concat(components)
		} else {
			this.indentation	= Math.min(6, Math.max(1, indentation));
			this.components		= components
		}
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		return `\n${ '#'.repeat(this.indentation) } ${ makedown.resolve(this.components) }`;
	}
}

module.exports = MarkdownHeadlineComponent;
