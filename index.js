const fs		= require('fs')
const factory	= require('./core/factory')

const componentsDirectory = `${ module.path }/components`;
fs.readdirSync(componentsDirectory).forEach(file => {
	const filename	= file.replace(/\.js$/, '');
	const component	= require(`${ componentsDirectory }/${ filename }`);
	const accessor	= filename.replace(/(-[a-z])/ig, group => group.toUpperCase().replace(/-/g, ''));

	factory.extend(accessor, component);
});

module.exports = factory;
