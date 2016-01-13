//Module for scanning all file paths recursively starting from 
//Root directory
//

//Module dependency
var recursive = require("recursive-readdir");
var path = require("path");
var HashMap = require("hashmap");



//data variables
var TIME_OUT_MAX = 5000;
var TIME_OUT_MIN = 1000;
var matchFiles = [];
var scanedFiles = [];

module.exports = {
	/**
	 * read all files in current working directory recursively
	 * @param  {[type]} fileType         [description]
	 * @param  {[type]} allFilesByTypeCB [description]
	 * @return {[type]}                  [description]
	 */
	allFilesByType: function(fileType, allFilesByTypeCB) {
		//
		recursive(process.cwd(), recursiveCB.bind(null, fileType, allFilesByTypeCB));
	}
}

/**
 * callBack executed after reading all files
 * @param  {[type]} fileType         [description]
 * @param  {[type]} allFilesByTypeCB [description]
 * @param  {[type]} err              [description]
 * @param  {[type]} files            [description]
 * @return {[type]}                  [description]
 */
function recursiveCB(fileType, allFilesByTypeCB, err, files) {
	if (err) throw err;
	files.forEach(scanedFilesCB.bind(null, fileType));
	allFilesByTypeCB(matchFiles);
}


/**
 * categorise file path and file name
 * @param  {[type]} fileType [description]
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
function scanedFilesCB(fileType, filePath) {
	if (isExtExist(fileType, path.extname(filePath))) {
		var pathNameMap = new HashMap();
		pathNameMap.set(filePath, path.basename(filePath));
		matchFiles.push(pathNameMap);
	};

}


/**
 * return true is  extension match with file path's extension
 * @param  {[type]}  fileType [description]
 * @param  {[type]}  extname  [description]
 * @return {Boolean}          [description]
 */
function isExtExist(fileType, extname) {
	var found = false;
	for (var i = 0; i < fileType.length; i++) {
		if (fileType[i] === extname) {
			found = true;
		};
	};
	return found;
}