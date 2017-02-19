/*
 Preview of the file. (No need to download it since it will be installed with npm install in node_modules/xatlib.)
 */
const url = require('url');

const request 	= require('request');
const admins	= { 7: 'Darren', 42: 'Xat', 99: 'ChrisRixon', 100: 'Sam', 101: 'Chris', 804: 'Bot' };
const adminsN	= { 'Darren': 7, 'Xat': 42, 'ChrisRixon': 99, 'Sam': 100, 'Chris': 101 };

exports.getRegname = (id, callback) => {
    if ((id == undefined) || (id == '') || (isNaN(id))) {
        return setImmediate(() => callback(new Error("You must specify an ID in your request or ID must be numeric.")));
    }
    if (admins[id] !== undefined) {
        return setImmediate(() => callback(null, admins[id]));
    }

    request("http://xat.me/SlOom?id=" + id, function(error, response, body) {
        if (error) {
          return callback(error)
        }
        if ((body == "") || (body.substr(0, 1) == "<")) {
            callback(new Error("ID not found"));
        } else {
            callback(null, body);
        }
    });
};

exports.getID = (reg, callback) => {
    if ((reg == undefined) || (reg == '') || (!isNaN(reg))) {
        return setImmediate(() => callback(new Error("You must specify a regname in your request.")));
    }
    if (adminsN[reg] !== undefined) {
        return setImmediate(() => callback(null, adminsN[reg]));
    }

    request("http://xat.me/SlOom?name=" + reg, function(error, response, body) {
        if (error) {
          return callback(error)
        }
        if ((body == "") || (body.substr(0, 1) == "<")) {
            callback(new Error("ID not found"));
        } else {
            callback(null, body);
        }
    });
};

exports.getChatInfo = (chat, callback) => {
    if ((chat == undefined) || (chat == "")) {
        return setImmediate(() => callback(new Error("You must add a chat name to your request.")));
    }

    var url = "http://xat.com/web_gear/chat/roomid.php?d=" + chat + "&v2";
    request(url, function(error, response, body) {
        if (error) {
          return callback(error)
        }
        if (body.substr(0, 1) == '-') {
            callback(new Error("This chat doesn't exist."));
        } else {
            var json    = JSON.parse(body);
            var opt     = json['a'].split(";=");
            var ar      = {
                'id': json['id'],
                'Name': json['g'],
                'Desc': json['d'],
                'Cinfo': {
                    'Background' : opt[0] ? opt[0] : null,
                    'Language': opt[3] ? opt[3] : null,
                    'Radio': opt[4] ? opt[4] : null,
                    'Buttons': opt[5] && opt[5].substr(0, 1) === '#' ? opt[5] : null
                }
            };
            callback(null, ar);
        }
    });
};

exports.getNewInfo = (callback) => {
	var name	= null;
	var topsh	= [];
	var pawns	= [];
	var url 	= "http://xat.com/web_gear/chat/pow2.php?Sloom=" + Date.now(); // so we can have the latest page. (shrug)
	request(url, function(error, response, body) {
		if ((body == false) || (body.substr(0, 1) !== "[")) {
			callback(new Error('Unable to read pow2 c:'));
		} else {
			var json	= JSON.parse(body);
			var id		= json[0][1]["id"];
			var status	= json[0][1]["text"] == "" ? "UNLIMITED" : json[0][1]["text"].replace('[', '').replace(']', '');
			for (var sm in json[4][1]) { // smileys list
				if (id == json[4][1][sm]) {
					topsh.push(sm);
				}
			}
			for (var nm in json[6][1]) { // power name 
				if (id == json[6][1][nm]) {
					name = nm;
				}
			}
			for (var pw in json[7][1]) { // pawns name 
				if (id == json[7][1][pw][0]) {
					pawns.push("hat#h" + pw);
				}
			}
			callback(null, {
				'id': id,
				'name': name,
				'status': status,
				'topsh': topsh.length == 0 ? nm : topsh.join(","),
				'pawns': pawns.length == 0 ? null : pawns.join(",")
			});
		}
	});
};

exports.getChatConnection = (chatID, callback) => {
    if ((chatID == undefined) || (chatID == "")) {
        return setImmediate(() =>
          callback(new Error("You must add a chat ID to your request.")));
    }

    var url = "https://api.illuxat.com/chatconnexion.php?roomid=" + chatID;
    request(url, function(error, response, body) {
        if (error) {
            return callback(error);
        }

        try {
            var json = JSON.parse(body);
        } catch (e) {
            return callback(e);
        }

        if (json.error) {
            return callback(new Error("Invalid room"));
        }

        var info = {
            'ip': json['ip'],
            'port': json['port'],
            'timeout': json['ctout']
        }

        return callback(null, info);
    });
};

exports.getNewUser = (callback) => {
    request('http://xat.com/web_gear/chat/auser3.php', (err, res, body) => {
        if (err) return callback(err)

        const { UserId, k1, k2 } = url.parse('?' + body, true).query

        if (UserId == null || k1 == null || k2 == null) {
            return callback(new Error('Service error'))
        }

        if (UserId >= 1800000000
            || k2 == 0) {
            return callback(new Error('Refused'))
        }

        const user = {
            id: UserId,
            k1,
            k2,
        }

        callback(null, user)
    })
}
