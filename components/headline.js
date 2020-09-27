class MarkdownHeadlineComponent {

	constructor (input, indentation = 1) {
		this.input			= input;
		this.indentation	= Math.min(6, Math.max(1, indentation));
		this.isInline		= false;
	}

	markdown () {
		return `${ '#'.repeat(this.indentation) } ${ this.isInline ? this.input : this.input + '\n' }`;
	}
}

module.exports = MarkdownHeadlineComponent;
