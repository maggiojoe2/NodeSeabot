var tmi = require('tmi.js');

var channellist = ["thesealion95", "seab0t95"];

var options = {
    options: {
        debug: false
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

client.on('connected', function(address, port) {
    client.whisper("thesealion95", "Seab0t connected to " + channellist);
    client.log.info("Address: " + address + " Port: " + port);
    // client.action(address, "Joined Channel.");
});

client.on('disconnected', function(reason) {
    console.log("Reconnecting...");
    client.connect();
});