var DirectoryLayoutGenerator = require('./generate.js');
var DirectoryLayoutVerifier = require('./verify.js');

module.exports = {
	generate: DirectoryLayoutGenerator.generate,
	verify: DirectoryLayoutVerifier.verify
}