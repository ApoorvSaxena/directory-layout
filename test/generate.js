var LayoutGenerator = require('../lib/generate.js');

LayoutGenerator.generate('test/fixtures/', {
	output: './test/output/layout.md',
	ignore: [
		'.DS_Store'
	]
});