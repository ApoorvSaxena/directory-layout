Directory Layout
=====

[![npm version](https://badge.fury.io/js/directory-layout.svg)](https://badge.fury.io/js/directory-layout)
[![dependencies](https://david-dm.org/ApoorvSaxena/directory-layout.svg)](https://david-dm.org/ApoorvSaxena/directory-layout)
[![dev dependencies](https://david-dm.org/ApoorvSaxena/directory-layout/dev-status.svg)](https://david-dm.org/ApoorvSaxena/directory-layout#info=devDependencies)

Verify your build's directory layout
***

Project builds can be complex, and the size and structure of the final build directory may be equally complex. While unit testing helps to ascertain if code is intact, "Directory Layout Verifier" tests that the build has resulted in correct creation of files / directories at respective positions, which otherwise takes unnecessary time to debug in case the build failed partially.

Creation of directory structure is also automated, checkout our [tests](https://github.com/ApoorvSaxena/directory-layout/tree/master/test).

We've used markdown syntax to store the directory structure, easy for you to verify visually. Here's an [example](https://raw.githubusercontent.com/ApoorvSaxena/directory-layout/master/test/output/layout.md).

Installation
-----

- NPM: `npm install -g directory-layout`

Usage:
-----

### From the command line: ###


  Usage: `directory-layout [options] <path, ...>`

  Options:

    -h, --help                                                 output usage information
    -V, --version                                              output the version number
    -g, --generate <path> <output-directory-layout-file-path>  Generate directory layout
    -v, --verify <input-directory-layout-file-path> <path>     Verify directory layout


Example for *directory layout generation*:

```
$ directory-layout -g test/fixtures output.md
Generating layout for test/fixtures...

Layout generated at: output.md
```

Example for *directory layout verification*:

```
$ directory-layout -v output.md test/fixtures
Verifying layout for test/fixtures ...

Successfully verified layout available in output.md.
```

### Within node: ###

For directory layout generation:

```
var DirectoryLayout = require('directory-layout');

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
```

For directory layout verification:

```
var DirectoryLayout = require('directory-layout');

DirectoryLayout
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

### grunt-directory-layout ###
If you are looking for the grunt plugin, head over to [grunt-directory-layout](https://github.com/ApoorvSaxena/grunt-directory-layout), created by @ApoorvSaxena

Coming soon:
-----

Gulp task

License
-----

Copyright (c) 2016 Apoorv Saxena, http://apoorv.pro Licensed under the MIT license.