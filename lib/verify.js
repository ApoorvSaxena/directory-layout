var fs = require('fs');
var path = require('path');
var byline = require('byline');
var Promise = require('bluebird');


function getNestedLevelIndex(line) {
	var spaceOccurence = line.match(/\s/g);
	return spaceOccurence ? (spaceOccurence.length/2) : 0;
}

function strip(string) {
	return string.replace(/\s/g, "");
}

function checkIfResourceExists(resourceLocation) {
	var isDirectory = (resourceLocation.split('').pop() === '/');

	try {
		var stats = fs.statSync(resourceLocation);
		if(isDirectory) {
			return stats.isDirectory();
		}
		else {
			return stats.isFile();
		}
	} catch (e) {
	    return false;
	}
}

var verify = function (file, options) {
	options = options || {};

	var readStream = byline(fs.createReadStream(file));
	var nestedLevelIndex = -1;
	var nestedLevel = [];
	var deferred = Promise.defer();
    var failures = [];

	readStream
	  .on('data', function (chunk) {
	    var line = chunk.toString();
	    var newNestedLevelIndex = getNestedLevelIndex(line);
	    var level = strip(line);

	    if(newNestedLevelIndex > nestedLevelIndex) {
	    	nestedLevelIndex = newNestedLevelIndex;
	    	nestedLevel.push(level);
	    }
	    else if (newNestedLevelIndex < nestedLevelIndex) {
	    	var removeLevels = nestedLevelIndex - newNestedLevelIndex;
	    	nestedLevelIndex = newNestedLevelIndex;
	    	for (var i = 0; i <= removeLevels; i++) {
	    		nestedLevel.pop();
	    	}
	    	nestedLevel.push(level);
	    }
	    else {
	    	nestedLevel.pop();
	    	nestedLevel.push(level);
	    }

	    var root = options.root ? options.root : '';
	    var location = nestedLevel.join('');
	    location = path.join(root, location);

	    if(!checkIfResourceExists(location)) {
	    	failures.push(location);
	    }
	  })
	  .on('end', function () {
	  	if(failures.length > 0) {
	  		deferred.reject(failures);
	  	}
	  	else {
	  		deferred.resolve();
	  	}
	  });

	  return deferred.promise;
};

module.exports = {
	verify: verify
};