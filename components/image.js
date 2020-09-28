class MarkdownImageComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}  link    The image url
	 * @param  {string}  altText The alternative text
	 */
	constructor (link, altText) {
		this.link		= link;
		this.altText	= altText;
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return `![${ this.altText }](${ this.link })`;
	}
}

module.exports = MarkdownImageComponent;
