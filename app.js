#!/usr/bin/env node

/**
 * Module Dependencies
 * @type {[type]}
 */
var reader = require("./reader");
var menu = require("./menu");
var scan = require("./scan");
var path = require("path");
var os = require("os");
var fs = require("fs-extra");

//Data variables
var menuList = ["Documents", "Musics", "Movies", "Pictures", "App/Zip files", "Quit"];

var fileType = {
	docs: [".doc", ".docx", ".pdf", ".xls", ".xlsx", ".txt", ".ppt", ".pptx", ".java", ".js"],
	musics: [".mp3"],
	movies: [".mp4", ".avi", ".mkv"],
	pictures: [".png", ".jpg", ".jpeg", ".gif"],
	apps: [".exe", ".jar", ".deb", ".tar.gz", ".zip", ".sql", ".iso"]
}

var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

console.log("                  Mambo Dunia         ");
reader.getInput("Enter number to choose resource  type [1-5] \n", true, processSelectionCB);
menu.show(menuList);



function processSelectionCB(number) {
	switch (number) {
		case 1:
			scan.allFilesByType(fileType.docs, showFiles);
			break;
		case 2:
			scan.allFilesByType(fileType.musics, showFiles);
			break;
		case 3:
			scan.allFilesByType(fileType.movies, showFiles);
			break;
		case 4:
			scan.allFilesByType(fileType.pictures, showFiles);
			break;
		case 5:
			scan.allFilesByType(fileType.apps, showFiles);
			break;


		default:
			console.log("You must enter number between 1 and 5 ");
			console.log("Program Terminating..... \n try  again");
			reader.close();
	}
}

function showFiles(foundFiles) {
	if (foundFiles.length > 0) {
		console.log("********************************");
		console.log("Enter number to copy file to Desktop \n");
		for (var i = 0; i < foundFiles.length; i++) {
			console.log(i + " :" + foundFiles[i].values());
		};
		console.log("");
		console.log("********************************\n");
		reader.getInput("Enter number to copy file to Desktop \n", true, prepareCopyCB.bind(null, foundFiles));
	} else {
		console.log("No files found in this directory");
	};
}

function prepareCopyCB(foundFiles, answer) {
	if (answer < foundFiles.length) {
		var selectedFile = foundFiles[answer].keys();
		var source = selectedFile[0];
		var destination = homeDir + "/Desktop/" + path.basename(source);
		fs.copy(source, destination, copyFileCB);
	}


}

function copyFileCB(err) {
	if (err) return console.error(err);
	console.log("Copied to Desktop");
}