class MarkdownParagraphComponent {

	constructor (...components) {
		this.components = components
	}

	markdown (makedown) {
		return `${ makedown.resolve(this.components) }\n\n`;
	}
}

module.exports = MarkdownParagraphComponent;
