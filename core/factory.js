const Makedown = require('./makedown.js')
const MarkdownEachComponent = require('../components/each');

class Factory {

	/**
	 * Extends the factory class with custom markdown-components
	 * @method extend
	 * @param  {string} accessor The accessor-title of the component
	 * @param  {object} delegate Either a class or a custom function
	 */
	static extend (accessor, delegate) {
		var staticAccessor = {};
		if (/^\s*class/.test(delegate.toString())) {
			staticAccessor[accessor] = (...content) => new delegate(...content);
		} else {
			staticAccessor[accessor] = (...content) => { return { toString: () => delegate(...content) } };
		}

		Object.assign(Factory, staticAccessor);
	}

	/**
	 * Creates a new buider for a readme file
	 * @method make
	 * @param  {object} components A list of markdown component parameters
	 * @return {Makedown}          A makedown instance to create a markdown file
	 */
	static make (...components) {
		const constructed = new Makedown(...components);

		//
		// Resolve subsets
		constructed.components.forEach(component => {
			if (!(component instanceof MarkdownEachComponent)) return;

			//
			// Resolved each component.
			// It need to be reversed because it is added backwards to the main components array
			var resolvedComponents = component.resolve().reverse();

			//
			// Determine the index of the each component
			var componentIndex = null;
			for (var compIndex = 0; compIndex < constructed.components.length; compIndex++) {
				if (component == constructed.components[compIndex]) {
					componentIndex = compIndex;
					delete constructed.components[compIndex];
					break;
				}
			}

			//
			// Append the resolved components at the right index
			resolvedComponents.forEach(resolvedComponent => {
				constructed.components.splice(componentIndex, 0, resolvedComponent);
			})
		});

		return constructed;
	}
}

module.exports = Factory;
