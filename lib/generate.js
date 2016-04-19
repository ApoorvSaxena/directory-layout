var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var _ = require('underscore');
var byline = require('byline');
var Promise = require('bluebird');

function parseFilePaths (root, filePaths, options) {
	var filteredFilePaths = [];

	_.each(filePaths, function(filePath) {
		for (var i = 0; i < options.ignore.length; i++) {
			if(filePath.indexOf(options.ignore[i]) !== -1) {
				return;
			}
		}

		filteredFilePaths.push(filePath.replace(root, ''));
	});

	filteredFilePaths = filteredFilePaths.sort();

	filteredFilePaths = _.map(filteredFilePaths, function(filePath) {
		filePath = filePath.split(/(?!\/$)\//);

		filePath = _.map(filePath, function(el, index) {
			if(index !== (filePath.length - 1)) {
				return "  ";
			}
			return el;
		});

		return filePath.join('');
	})

	return filteredFilePaths;
}

function writeToFile(paths, options) {
	var lineStream = byline.createStream();
	var output = fs.createWriteStream(options.output);
	lineStream.pipe(output);

	_.each(paths, function(path, index) {
		var nextLineChar = (index === (paths.length - 1)) ? '' : '\n';
		lineStream.push(path + nextLineChar);
	});
	lineStream.push(null);
}

function parsePaths(paths) {
	paths.dirs = _.map(paths.dirs, function(path) {
		return path + '/';
	});
	paths = _.union(paths.files, paths.dirs);
	return paths;
}

function generate(root, options) {
	options = options || {};
	var layout = "";
	var defer = Promise.defer();

	dir.paths(root, function(err, paths) {
	    if (err) {
    		defer.reject();
	    }

		paths = parsePaths(paths);
	    paths = parseFilePaths(root, paths, options);

	    writeToFile(paths, options);
	    defer.resolve();
	});

	return defer.promise;
}

module.exports = {
	generate: generate
};