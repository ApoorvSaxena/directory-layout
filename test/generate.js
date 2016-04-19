var DirectoryLayout = require('../lib/index.js');

DirectoryLayout
	.generate('test/fixtures/', {
		output: './test/output/layout.md',
		ignore: [
			'.DS_Store'
		]
	})
	.then(function() {
		console.log('Layout successfully generated');
	});