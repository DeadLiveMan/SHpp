const ATM = {
    is_auth: false, 
    current_user:false,
    current_type:false,
    history:false,
     
    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],
    // authorization
    auth: function(number, pin) {
        if (this.is_auth) {
            console.log("please logout current user");
            return;
        }
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].number === number && this.users[i].pin === pin) {
                this.is_auth = true;
                this.current_user = i;
                this.current_type = this.users[i].type;
                console.log("authorization is ok ");
                this.history = 'authorization ' + this.current_type + ': ' + this.users[i].number;
                return;
            }
        }
        console.log("access denied");
    },
    // check current debet
    check: function() {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        console.log("your debet is: " + this.users[this.current_user].debet);
    },
    // get cash - available for user only
    getCash: function(amount) {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (amount < 0) {
            console.log("incorrect value");
        }
        if (amount > this.users[this.current_user].debet) {
            console.log("you have only " + this.users[this.current_user].debet + " babok");
            return;
        }
        if (amount > this.cash) {
            console.log("ATM have only " + this.cash + " babok");
            return;
        }
        this.cash -= amount;
        this.users[this.current_user].debet -= amount;
        this.history = 'get Cash ' + this.current_type + ': ' + this.users[this.current_user].number + ' get ' + amount;
    },
    // load cash - available for user only
    loadCash: function(amount){
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (amount < 0) {
            console.log("incorrect value");
        }
        this.cash += amount;
        this.users[this.current_user].debet += amount;
        this.history = 'load Cash ' + this.current_type + ': ' + this.users[this.current_user].number + ' load ' + amount;
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (this.current_type !== 'admin') {
            console.log("access denied");
        }
        this.cash += addition;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (this.current_type !== 'admin') {
            console.log("access denied");
        }
        console.log("cash: " + this.cash + "\n");
        console.log(this.history);
    },
    // log out
    logout: function() {
        this.history = 'logout ' + this.current_type + ': ' + this.users[this.current_user].number;
        this.is_auth = false;
        this.current_user = false;
        this.current_type= false;
    },
};
