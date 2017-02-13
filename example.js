var xat        = require('./xat.js');

//Ouput : SlOom
xat.getRegname(110110, function(response) {
    console.log(response);
});

//Ouput : Not found
xat.getID('xSlOom444', function(response) {
    console.log(response);
});

//Ouput : { id: '3764264', Name: 'Abc', Desc: 'Welcome to Abc Chatgroup! Enjoy your stay! :)', Cinfo:  { Background: 'http://i55.tinypic.com/se2hwm.png', Language: 'English', Radio: 'http://173.242.119.50:9996', Buttons: 'None' } }
xat.getChatInfo('abc', function(response) {
    console.log(response);
});