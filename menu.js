//Module for showing menu of action
//for the user to choose.

//Module dependency


module.exports = {
	/**
	 * displays menu of action
	 * @param  {[type]} menuList [description]
	 * @return {[type]}          [description]
	 */
	show: function(menuList) {
		console.log("********************************************");
		for (var i = 0; i < menuList.length; i++) {
			console.log(i + 1 + " :" + menuList[i]);
		};
		console.log("********************************************");
	}
}