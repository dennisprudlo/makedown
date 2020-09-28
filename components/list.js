class MarkdownListComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {array}  items    The item for the list to display
	 * @param  {object} options  The options for the list component
	 */
	constructor (items, options = {}) {
		this.items		= items;
		this.options	= {
			type: 'unordered'
		};

		//
		// Merge the passed options with the default options
		Object.assign(this.options, options);
	}

	/**
	 * Determines the correct list item prefix for a specific item
	 * @method prefix
	 * @param  {object} data The list item data information
	 * @return {string}      The prefix to use for the list item
	 */
	prefix (data) {

		//
		// Consider the custom item type if its set but only when its not a checklist
		// Checklist have always a check prefix
		var type = this.options.type !== 'check' && data.type !== null ? data.type : this.options.type;

		switch (type) {

			//
			// Ordered lists are prefixed with "1." except a custom prefix number is given
			case 'ordered':	return `${ data.prefix !== null ? data.prefix : '1' }.`;

			//
			// Check lists are prefixed with brackets containing an "x" if the checked state was given
			case 'check':	return `[${ data.checked ? 'x' : ' ' }]`;

			//
			// Any other item type falls back to a simple unordered list item
			default:		return `-`;
		}
	}

	/**
	 * Puts the items in a list order
	 * @method putItems
	 * @param  {array} items             The array of list items
	 * @param  {number} [prefixOffset=0] The number of spaces needed for proper indentation
	 * @return {string}                  The rendered list as a string
	 */
	putItems (items, prefixOffset = 0) {

		//
		// The previous prefix length determines how long the prefix of the previous item is
		var previousPrefixLength = 0;
		return items.map(item => {

			//
			// If the item is an array, its a sublist we want to inject
			if (Array.isArray(item)) {

				//
				// Inject the sublist with the previous prefix length
				return this.putItems(item, previousPrefixLength);
			}

			//
			// Create the default data object we will work with from now on
			var data = {
				text:		item,
				checked:	false,
				type:		null,
				prefix:		null
			};

			//
			// Set the item options if the item is an object with option fields
			if (typeof item === 'object' && item.hasOwnProperty('text')) {
				data.text		= item.text;
				data.checked	= item.hasOwnProperty('checked') ?	item.checked :	false;
				data.type		= item.hasOwnProperty('type') ?		item.type :		null;
				data.prefix		= item.hasOwnProperty('prefix') ?	item.prefix :	null;
			}

			//
			// Checklists cannot have mixed list items.
			// The whole list must be a checklist
			if (this.options.type == 'check' || data.type == 'check') {
				data.type	= null;
				data.prefix	= null;
			}

			//
			// If the list is a checklist all items with parentheses at the start
			// must be escaped so its not interpreted as a link
			if (this.options.type == 'check' && typeof data.text === 'string') {
				data.text = data.text.replace(/^\(/gm, '\\(');
			}

			//
			// Generate the amount of spaces for the indentation
			var spaces = ' '.repeat(prefixOffset);

			//
			// Generate the entry prefix
			var prefix	= spaces + this.prefix(data) + ' ';

			//
			// Concatenate the prefix and the content for the output
			var output	= `${ prefix }${ data.text }\n`;

			//
			// Set the new previous Prefix Length
			previousPrefixLength = prefix.length;

			return output;
		}).join('');
	}

	/**
	 * Generates the markdown string of the component
	 * @method toString
	 * @return {string} The generated markdown string
	 */
	toString () {
		return this.putItems(this.items);
	}
}

module.exports = MarkdownListComponent;
