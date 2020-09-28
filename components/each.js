class MarkdownEachComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string} content  The content to use for the bold text
	 */
	constructor (collection, handler) {
		this.collection	= collection;
		this.handler	= handler;
	}

	resolve () {
		return this.collection.map(item => this.handler(item).components).flat();
	}
}

module.exports = MarkdownEachComponent;
