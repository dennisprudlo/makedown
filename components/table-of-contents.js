const MarkdownHeadlineComponent = require('./headline');

class MarkdownTableOfContentsComponent {

	/**
	 * Constructs the markdown component
	 * @method constructor
	 * @param  {string}    title The title for the table of contents
	 */
	constructor (options = {}) {
		this.options	= {
			title:					'Table of Contents',
			include:				[2, 3, 4, 5, 6],
			collectFromBeginning:	false,
		};

		Object.assign(this.options, options);
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	resolve (makedown) {
		var tableOfContentsFound	= this.options.collectFromBeginning;
		var tableOfContents			= [];
		var smallestIndentation		= 6;
		makedown.components.forEach(component => {
			if (component instanceof MarkdownTableOfContentsComponent) {
				tableOfContentsFound = true;
			}

			if (tableOfContentsFound && component instanceof MarkdownHeadlineComponent) {

				//
				// Skip if the headlines indentation level is not included in the TOC options
				if (!this.options.include.includes(component.indentation)) return;

				//
				// Keep track of the smallest indentation
				if (component.indentation < smallestIndentation) {
					smallestIndentation = component.indentation;
				}

				//
				// Push the table of contents item to the array
				tableOfContents.push({
					indentation:	component.indentation,
					content:		makedown.resolve(component.components).trim()
				});
			}
		});

		//
		// Normalize the table of contents to the smallest indentation of 1
		tableOfContents = tableOfContents.map(entry => {
			entry.indentation = entry.indentation - (smallestIndentation - 1);
			return entry;
		});

		var indentationSpaces = ['', '', '  ', '    ', '      ', '      ', '      ']

		//
		// Create the table of contents string
		const tocString = tableOfContents.map(entry => {
			const href = `#${ entry.content.toLowerCase().replace(/\ /g, '-') }`
			return `${ indentationSpaces[entry.indentation] }- [${ entry.content }](${ href })`;
		}).join('\n');

		//
		// Return the table of contents with the passed title
		return `\n\n## ${this.options.title}\n${ tocString }`;
	}
}

module.exports = MarkdownTableOfContentsComponent;
