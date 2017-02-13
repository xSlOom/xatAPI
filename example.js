var xat = require('xatlib');

xat.getRegname('110110', (err, res) => {
	if (err != null) {
		console.log('Something went wrong with your request : ' + err);
	} else {
		console.log(res);
	}
});
