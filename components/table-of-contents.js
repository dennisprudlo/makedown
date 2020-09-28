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
			type:					'unordered'
		};

		Object.assign(this.options, options);
	}

	/**
	 * Resolves the component into a markdown string
	 * @method resolve
	 * @param  {Makedown} makedown A reference to the makedown instance
	 * @return {string}            The resolved markdown string
	 */
	generate (makedown) {
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
				if (!this.options.include.includes(component.options.indentation)) return;

				//
				// Keep track of the smallest indentation
				if (component.options.indentation < smallestIndentation) {
					smallestIndentation = component.options.indentation;
				}

				//
				// Push the table of contents item to the array
				tableOfContents.push({
					content: component.content,
					options: component.options
				});
			}
		});

		//
		// Normalize the table of contents to the smallest indentation of 1
		tableOfContents = tableOfContents.map(entry => {
			entry.indentation = entry.indentation - (smallestIndentation - 1);
			return entry;
		});

		var prefix = this.options.type == 'ordered' ? '1. ' : '- ';

		//
		// Create the table of contents string
		const tocString = tableOfContents.map(entry => {

			//
			// Determine the right ID to link to
			// Use the given tocHref from the options. If not set generate a slug from the title
			var hrefId = entry.options.tocHref;
			if (typeof hrefId !== 'string') {
				hrefId =  entry.content.toString()
					.toLowerCase()
					.replace(/[^a-zA-Z0-9\ ]/g, '')
					.replace(/\ /g, '-');
			}

			const indentation	= ' '.repeat((entry.options.indentation - 1) * prefix.length);
			const title			= entry.options.tocTitle !== null ? entry.options.tocTitle : entry.content;

			return `${ indentation }${ prefix }[${ title }](#${ hrefId })`;
		}).join('\n');

		//
		// Return the table of contents with the passed title
		return `## ${this.options.title}\n${ tocString }\n\n`;
	}
}

module.exports = MarkdownTableOfContentsComponent;
