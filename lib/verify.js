var fs = require('fs');
var path = require('path');
var byline = require('byline');


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
	var failure = 0;

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
	    	console.log("Issue with: " + location);
	    	failure++;
	    }
	  })
	  .on('end', function () {
	  	if(failure > 0) {
  			console.log('\n' + failure + ' failure(s) found');
	  	}
	  	else {
	  		console.log('0 failure, verified successfully.');
	  	}
	  });
};

module.exports = {
	verify: verify
};