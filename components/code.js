class MarkdownCodeComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}    code The source code
	 */
	constructor (language, code) {
		if (code === undefined) {
			this.language	= null;
			this.code		= language
		} else {
			this.language	= typeof language === 'string' ? language : null
			this.code		= code
		}
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		if (this.code.includes('\n')) {
			return `\n\`\`\`${ this.language !== null ? this.language : '' }\n${ this.code }\n\`\`\``;
		} else {
			return `\`${ this.code }\``;
		}
	}
}

module.exports = MarkdownCodeComponent;
