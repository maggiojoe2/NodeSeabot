/* - - - - - - - - - - - - - - - - - - - - - - - -
    Seab0t NodeJS for Twitch
    Joe Maggio
 - - - - - - - - - - - - - - - - - - - - - - - - */

var tmi = require('tmi.js');
var channellist = ["thesealion95"];

/* - - - - - - - - - - - - - - - - - - - - - - - -
    Connection Stuff
 - - - - - - - - - - - - - - - - - - - - - - - - */

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "seab0t95",
        password: "oauth:djbb8dxqbqbz3nllgpwbfuxao08c6q"
    },
    channels: channellist,
};

var client = new tmi.client(options);
client.connect();

/* - - - - - - - - - - - - - - - - - - - - - - - -
    Event Listeners
 - - - - - - - - - - - - - - - - - - - - - - - - */

client.on('connected', function(address, port) {
    client.whisper("thesealion95", "Seab0t connected to " + channellist);
    client.log.info("Address: " + address + " Port: " + port);
    // client.action("thesealion95", "Joined Channel.");
});

client.on('disconnected', function(reason) {
    client.log.info("Reconnecting...");
    client.connect();
});


/* - - - - - - - - - - - - - - - - - - - - - - - -
    Request for Chatters API call
 - - - - - - - - - - - - - - - - - - - - - - - - */

var request = require("request");
var url = "https://tmi.twitch.tv/group/user/nalcs1/chatters";

var getChatters = setInterval(function() {
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            regexp = new RegExp(/thesealion\d{2,}/);
            users = body.chatters.viewers;
            // console.log(users);
            for (i = 0; i < users.length; i++) {
                var check = regexp.test(users[i]);
                if (check) {
                    client.whisper("thesealion95", "Found " + users[i] + " in the chat.");
                    client.whisper("thesealion95", "use: /ban " + users[i]);
                }
            }
        }
    });    
}, 60000);