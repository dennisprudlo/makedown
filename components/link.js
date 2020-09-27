class MarkdownLinkComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}    link  The url to link to
	 * @param  {string}    label The label to show instead of the url
	 */
	constructor (link, label = null) {
		this.link	= link;
		this.label	= typeof label === 'string' ? label : null;
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		if (this.label !== null) {
			return `[${ this.label }](${ this.link })`;
		} else {
			return this.link;
		}
	}
}

module.exports = MarkdownLinkComponent;
