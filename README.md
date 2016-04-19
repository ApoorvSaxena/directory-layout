### Directory Layout

Project builds can be complex, and the size and structure of the final build directory may be equally complex. While unit testing helps to ascertain if code is intact, "Directory Layout Verifier" tests that the build has resulted in correct creation of files / directories at respective positions, which otherwise takes unnecessary time to debug in case the build failed partially.

Creation of directory structure is also automated, checkout our [tests](https://github.com/ApoorvSaxena/directory-layout/tree/master/test) folder for further understanding.

We've used markdown syntax to store the directory structure, easy for you to verify visually. Here's an [example](https://raw.githubusercontent.com/ApoorvSaxena/directory-layout/master/test/output/layout.md).

##### Usage:

For directory layout generation:

```
var LayoutGenerator = require('../lib/generate.js');

LayoutGenerator
	.generate('test/fixtures/', {
		output: './test/output/layout.md',
		ignore: [
			'.DS_Store'
		]
	})
	.then(function() {
		console.log('Layout successfully generated');
	});
```

For directory layout verification:

```
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
```

##### Coming soon:
- Grunt and Gulp tasks