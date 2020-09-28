class MarkdownLinkComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}        link    The url to link to
	 * @param  {object|string} options The options for the link. If set to a string its used as the label
	 */
	constructor (link, options = {}) {
		this.link = link;
		this.options = {
			label: null
		};

		if (typeof options === 'string') {

			//
			// Set the label value if the options are a string
			this.options.label = options
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
	toString () {
		return `[${ this.options.label !== null ? this.options.label : this.link }](${ this.link })`;
	}
}

module.exports = MarkdownLinkComponent;
