var LayoutVerifier = require('../lib/verify.js');

LayoutVerifier.verify('test/output/layout.md', {
	root: './test/fixtures'
});