/*
 Module with all functions.
 */

const request = require('request');

exports.getRegname = function(id, callback) {
    if ((id == undefined)) {
        callback("You must specify an ID in your request.");
    } else if (isNaN(id)) {
        callback("ID must be numeric.");
    } else {
        var admins = {
            7: 'Darren',
            42: 'Xat',
            100: 'Sam',
            101: 'Chris'
        };

        if (admins[id] !== undefined) {
            callback('The regname for ' + id + ' is : ' + admins[id]);
        } else {
            request("http://xat.me/SlOom?id=" + id, function(error, response, body) {
                callback((body == "" ? "Not found" : "The regname for " + id + " is : " + body));
            });
        }
    }
};

exports.getID = function (reg, callback) {
    if ((reg == undefined)) {
        callback("You must specify a regname in your request.");
    } else if (!isNaN(reg)) {
        callback("Regname must not be numeric.");
    } else {
        var admins = {
            'Darren': 7,
            'Xat': 42,
            'Sam': 100,
            'Chris': 101
        };

        if (admins[reg] !== undefined) {
            callback("ID for " + reg + " is : " + admins[reg]);
        } else {
            request("http://xat.me/SlOom?name=" + reg, function(error, response, body) {
                callback((body == "" ? "Not found" : "ID for " + reg + " is : " + body));
            });
        }
    }
};

exports.getChatInfo = function (chat, callback) {
    if (chat == undefined) {
        callback("You must add a chat name to your request.");
    } else {
        var url = "http://xat.com/web_gear/chat/roomid.php?d=" + chat + "&v2";
        request(url, function(error, response, body) {
            if (body.substr(0, 1) == '-') {
                callback("This chat doesn't exist.");
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
                callback(ar);
            }
        });
    }
};
