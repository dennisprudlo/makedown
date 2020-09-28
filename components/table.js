class MarkdownTableComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {array}  headers  An array of the header titles
	 * @param  {array}  rows     An array containing arrays of content for each row
	 */
	constructor (headers = [], rows = []) {
		this.headers	= headers;
		this.rows		= rows;
	}

	tableHeader () {
		var titles	= this.headers.join(' | ');
		var divider	= this.headers.map(title => '-'.repeat(title.length)).join(' | ');
		return `${ titles }\n${ divider }\n`;
	}

	tableRows () {
		return this.rows.map(row => row.join(' | ')).join('\n');
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return `${ this.tableHeader() }${ this.tableRows() }\n`;
	}
}

module.exports = MarkdownTableComponent;
