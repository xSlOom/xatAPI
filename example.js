const xat = require('xatapi');

// getRegname example
xat.getRegname(110110, (err, res) => {
    if (err != null) {
	console.log('Something went wrong with your request : ' + err);
    } else {
	console.log(res);
    }
});

// getID example
xat.getID('xSlOom', (err, res) => {
    if (err != null) {
	console.log('Something went wrong with your request : ' + err);
    } else {
	console.log(res);
    }
});

// get Chat infos
xat.getChatInfo('rubyyy', (err, res) => {
    if (err != null) {
	console.log('Something went wrong with your request : ' + err);
    } else {
	console.log(res);
    }
});

// get power infos
xat.getNewInfo((err, res) => {
    if (err != null) {
	console.log('Something went wrong with your request : ' + err);
    } else {
	console.log(res);
    }
});
