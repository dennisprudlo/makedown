class MarkdownHeadlineComponent {

	constructor (indentation = 1, ...components) {
		if (isNaN(arguments[0]) || !Number.isInteger(arguments[0])) {
			this.indentation	= 1
			this.components		= [indentation].concat(components)
		} else {
			this.indentation	= Math.min(6, Math.max(1, indentation));
			this.components		= components
		}
	}

	markdown (makedown) {
		return `${ '#'.repeat(this.indentation) } ${ makedown.resolve(this.components) }\n`;
	}
}

module.exports = MarkdownHeadlineComponent;
