module.exports = {

    clients: [],

    init: function (satelize, socket, callback) {
        var init = this;
        if (typeof callback == "function") {
            var client = {
                id : null,
                username: null,
                geo : null
            }
            client.id = socket.id;
            satelize.satelize( { ip : this.ip(socket ) }, function(error, payload) {
                client.geo = payload;
                var exists = null;
                if (init.clients.length > 0) {
                    for (var i = 0; i < init.clients.length; i++) {
                        if(init.clients[i].id == client.id) {
                            exists = client.id;
                        }
                    }
                }
                if (exists == null) {
                    init.addClient(client); 
                }
                callback();
            });
        }
    },

    /* information retrieval*/
    ip: function (socket) {
        return cleanIp(socket.handshake.address)
    },

    /* client (the user) stuff */
    addClient: function (client) {
        if (client.id !== null) {
            this.clients.push(client);
            // console.log(client.id + ' added to clients.');
            console.log('Added to clients id:' + client.id + '; name:' + client.name + '; geo:' + client.geo);  
        } else {
            console.log('Cannot add client: id (null)');
        }
    },
    fetchClient: function (id) {
        for (var i = 0; i < this.clients.length; i++) {
            if(this.clients[i].id == id) {
                return this.clients[i];
            }
        }
    },
    removeClient: function (client) {
        console.log('removing client: ' + client.id);
        var found = null;
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i] == client) {
                this.clients.splice(i,1);
                found = this.clients[i];
                break;
            }
        }
        if (this.clients.length > 0) {
            console.log('client list after removal: ');
            for (var i = 0; i < this.clients.length; i++) {
                console.log('id:' + this.clients[i].id + '; name:' + this.clients[i].name + '; geo:' + this.clients[i].geo);
            }
        } else {
            console.log('No clients in client array after last removal.');
        }
    },

    uniqueId : function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + s4();
    }

}

function cleanIp (ip) {
    return ip.replace('::ffff:','');
}