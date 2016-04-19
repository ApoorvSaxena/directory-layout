var LayoutVerifier = require('../lib/verify.js');

LayoutVerifier
	.verify('test/output/layout.md', {
		root: './test/fixtures'
	})
	.then(function() {
		console.log('Successfully resolved');
	})
	.catch(function(failures) {
		console.log('Failures found at: ');
		for (var i = 0; i < failures.length; i++) {
			console.log("- " + failures[i]);
		}
	});