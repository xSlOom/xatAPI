/*
 Module with all functions.
 */

const request = require('request');

exports.getRegname = (id, callback) => {
    if ((id == undefined) || (id == '') || (isNaN(id))) {
        return callback("You must specify an ID in your request or ID must be numeric.", null);
    } else {
        var admins = {
            7: 'Darren',
            42: 'Xat',
            100: 'Sam',
            101: 'Chris'
        };

        if (admins[id] !== undefined) {
            callback(null, admins[id]);
        } else {
            request("http://xat.me/SlOom?id=" + id, function(error, response, body) {
                if ((body == "") || (body.substr(0, 1) == "<")) {
					callback("ID not found", null);
				} else {
					callback(null, body);
				}
            });
        }
    }
};

exports.getID = (reg, callback) => {
    if ((reg == undefined) || (!isNaN(reg))) {
        callback("You must specify a regname in your request.", null);
    } else {
        var admins = {
            'Darren': 7,
            'Xat': 42,
            'Sam': 100,
            'Chris': 101
        };

        if (admins[reg] !== undefined) {
            callback(null, admins[reg]);
        } else {
            request("http://xat.me/SlOom?name=" + reg, function(error, response, body) {
                if ((body == "") || (body.substr(0, 1) == "<")) {
					callback("ID not found", null);
				} else {
					callback(null, body);
				}
            });
        }
    }
};

exports.getChatInfo = (chat, callback) => {
    if ((chat == undefined) || (chat == "")) {
        callback("You must add a chat name to your request.", null);
    } else {
        var url = "http://xat.com/web_gear/chat/roomid.php?d=" + chat + "&v2";
        request(url, function(error, response, body) {
            if (body.substr(0, 1) == '-') {
                callback("This chat doesn't exist.", null);
            } else {
                var json    = JSON.parse(body);
                var opt     = json['a'].split(";=");
                var ar      = {
                    'id': json['id'],
                    'Name': json['g'],
                    'Desc': json['d'],
                    'Cinfo': {
                        'Background' : opt[0] !== "" ? opt[0] : "None",
                        'Language': opt[3] !== "" ? opt[3] : "None",
                        'Radio': opt[4] !== "" ? opt[4] : "None",
                        'Buttons': opt[5].substr(0, 1) == '#' ? opt[5] : "None"
                    }
                };
                callback(null, ar);
            }
        });
    }
};
