//This Node module reads inputs from user
//via command line utility.

var readline = require("readline");


//create interface to handle input and output of data

var read = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

module.exports = {

	/**
	 * gets a number or normal text from user via terminal
	 * @param  {[type]}  instruction [description]
	 * @param  {Boolean} isNumber    [if true expected input must be number]
	 * @param  {[type]}  inputCB     [action callback to be executed after reading a number]
	 * @return {[type]}              [description]
	 */
	getInput: function(instruction, isNumber, inputCB) {
		read.question(instruction, questionCb.bind(null, isNumber, inputCB));
	},

	/**
	 * close reading stream
	 * @return {[type]} [description]
	 */
	close: function() {
		read.close();
	}
}

/**
 * callback invoked after reading inpkut from user
 * @param  {Boolean} isNumber [description]
 * @param  {[type]}  inputCB  [callback specifyies action to be done after reading a number]
 * @param  {[type]}  answer   [description]
 * @return {[type]}           [description]
 */
function questionCb(isNumber, inputCB, answer) {
	read.pause();
	if (isNumber) {
		if (valid(answer)) {
			//invoke  getInput callback
			inputCB(Number(answer));
		} else {
			console.log("Invalid Entry, please try again....");
			read.close();
		};
	} else {
		//invoke  getInput callback
		inputCB(answer);
	};
}

/**
 * verify a real number 
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
function valid(number) {
	return !isNaN(Number(number));
}