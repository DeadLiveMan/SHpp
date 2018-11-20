const ATM = {
    is_auth: false, 
    current_user: false,
    current_type: false,
    history: false,
     
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
                this.current_user = this.users[i];
                this.current_type = this.current_user.type;
                console.log("authorization is ok ");
                this.history = 'authorization ' + this.current_type + ': ' + this.current_user.number;
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
        this.history = 'check debet ' + this.current_type + ': ' + this.current_user.number;
        console.log("your debet is: " + this.current_user.debet);
    },
    // get cash - available for user only
    getCash: function(amount) {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }

        if (this.current_type === 'admin') {
            console.log("sorry, its only for users");
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount < 1) {
            console.log("incorrect input");
            return;
        }

        if (amount > this.current_user.debet) {
            console.log("you have only " + this.current_user.debet + " money");
            return;
        }
        if (amount > this.cash) {
            console.log("ATM have only " + this.cash + " money");
            return;
        }
        this.cash -= amount;
        // noinspection JSPrimitiveTypeWrapperUsage
        this.current_user.debet -= amount;
        console.log('you get ' + amount + ' money, your debet is ' + this.current_user.debet);
        this.history = 'get Cash ' + this.current_type + ': ' + this.current_user.number + ' get ' + amount;
    },
    // load cash - available for user only
    loadCash: function(amount){
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }

        if (this.current_type === 'admin') {
            console.log("sorry, its only for users");
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount < 1) {
            console.log("incorrect input");
            return;
        }
        this.cash += amount;
        // noinspection JSPrimitiveTypeWrapperUsage
        this.current_user.debet += amount;
        console.log('you load ' + amount + ' money, your debet is ' + this.current_user.debet);
        this.history = 'load Cash ' + this.current_type + ': ' + this.current_user.number + ' load ' + amount;
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (this.current_type !== 'admin') {
            console.log("access denied");
            return;
        }

        addition = Number(addition);

        if (isNaN(addition) || addition < 1) {
            console.log("incorrect input");
            return;
        }

        this.cash += addition;
        console.log('you load ' + addition + ' money in ATM, now ATM have ' + this.cash);
        this.history = 'load cash in ATM ' + this.current_type + ': ' + this.current_user.number;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (!this.is_auth) {
            console.log("do authorization pls");
            return;
        }
        if (this.current_type !== 'admin') {
            console.log("access denied");
            return;
        }
        console.log("cash: " + this.cash + "\n" + this.history);
        this.history = 'get Report ' + this.current_type + ': ' + this.current_user.number;
    },
    // log out
    logout: function() {
        if (!this.is_auth) {
            console.log('you not a logged');
            return;
        }
        this.history = 'logout ' + this.current_type + ': ' + this.current_user.number;
        console.log('Logout ok');
        this.is_auth = false;
        this.current_user = false;
        this.current_type= false;
    },
};
