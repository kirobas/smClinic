module.exports = {

    bills: [],

    init: function (socket, callback) {
        var init = this;
        if (typeof callback == "function") {
            var bill = {
                id : null,
                value: 0
            }
            bill.id = socket.id;

            var exists = null;
            if (init.bills.length > 0) {
                for (var i = 0; i < init.bills.length; i++) {
                    if(init.bills[i].id == bill.id) {
                        exists = bill.id;
                    }
                }
            }
            if (exists == null) {
                init.addBill(bill); 
            }
            callback();
        }
    },

    addBill: function (bill) {
        if (bill.id !== null) {
            this.bills.push(bill);
            console.log(bill.id + ' added to bills.');
            console.log('bill list after adding: ');
            for (var i = 0; i < this.bills.length; i++) {
                console.log('id:' + this.bills[i].id + ', value:' + this.bills[i].value + ';');
            }
        } else {
            console.log('Cannot add bill: id (null)');
        }
    },
    fetchBill: function (id) {
        for (var i = 0; i < this.bills.length; i++) {
            if(this.bills[i].id == id) {
                return this.bills[i];
            }
        }
    },
    removeBill: function (bill) {
        console.log('removing bill: ' + bill.id);
        var found = null;
        for (var i = 0; i < this.bills.length; i++) {
            if (this.bills[i] == bill) {
                this.bills.splice(i,1);
                found = this.bills[i];
                break;
            }
        }
        if (this.bills.length > 0) {
            console.log('bill list after removal: ');
            for (var i = 0; i < this.bills.length; i++) {
                console.log('id:' + this.bills[i].id + ', value:' + this.bills[i].value + ';');
            }
        } else {
            console.log('No bills in bill array after last removal.');
        }
    },

}

