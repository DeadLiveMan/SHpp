const ATM = {
    is_auth: false, 
    current_user: false,
    current_type: false,
    history: ['ATM started ' + new Date().toUTCString()],
     
    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: '0000', pin: '000', debet: 0, type: 'admin'}, // EXTENDED
        {number: '0025', pin: '123', debet: 675, type: 'user'}
    ],
    // authorization
    auth: function(number, pin) {
        if (this.is_auth) {
            this.history.push(`auth: false, now authorized ${this.current_type}: ${this.current_user.number} `
                + new Date().toUTCString());
            console.log('please, logout current user');
            return;
        }
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].number === number && this.users[i].pin === pin) {
                this.is_auth = true;
                this.current_user = this.users[i];
                this.current_type = this.current_user.type;
                this.history.push(`auth: true, ${this.current_type}: ${this.current_user.number} `
                    + new Date().toUTCString());
                console.log('you authorized');
                return;
            }
        }
        this.history.push(`auth: false, wrong pass/login ` + new Date().toUTCString());
        console.log('Access denied, wrong pass/login');
    },
    // check current debet
    check: function() {
        if (!this.is_auth) {
            this.history.push('check: false, not authorized ' + new Date().toUTCString());
            console.log('Do authorization pls');
            return;
        }
        this.history.push(`check: true, ${this.current_type}: ${this.current_user.number} ` + new Date().toUTCString());
        console.log(`your debet is ${this.current_user.debet}`);
    },
    // get cash - available for user only
    getCash: function(amount) {
        if (!this.is_auth) {
            this.history.push(`getCash: false, not authorized ` + new Date().toUTCString());
            console.log('Do authorization pls');
            return;
        }

        if (this.current_type === 'admin') {
            this.history.push(`getCash: false, it\`s not user ${this.current_type}: `
                + `${this.current_user.number} ` + new Date().toUTCString());
            console.log('sorry, its only for users');
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount < 1) {
            this.history.push(`getCash: false, incorrect input ${this.current_type}: `
                + `${this.current_user.number} ` + new Date().toUTCString());
            console.log('incorrect input');
            return;
        }

        if (amount > this.current_user.debet) {
            this.history.push(`getCash: false, you not have so many money ${this.current_type}: `
                + `${this.current_user.number} ` + new Date().toUTCString());
            console.log('you have only ' + this.current_user.debet + ' money');
            return;
        }
        if (amount > this.cash) {
            this.history.push(`getCash: false, ATM not have so many money ${this.current_type}: `
                + `${this.current_user.number} ` + new Date().toUTCString());
            console.log(`ATM have only ${this.cash} money`);
            return;
        }
        this.cash -= amount;
        // noinspection JSPrimitiveTypeWrapperUsage
        this.current_user.debet -= amount;
        console.log(`you get ${amount} money, your debet is ${this.current_user.debet}`);
        this.history.push(`getCash: true ${this.current_type}: ${this.current_user.number} get ${amount} `
            + new Date().toUTCString());
    },
    // load cash - available for user only
    loadCash: function(amount){
        if (!this.is_auth) {
            this.history.push('loadCash: false, not authorized ' + new Date().toUTCString());
            console.log('do authorization pls');
            return;
        }

        if (this.current_type === 'admin') {
            this.history.push(`loadCash: false, it\`s not user ${this.current_type}: ${this.current_user.number} `
                + new Date().toUTCString());
            console.log('sorry, its only for users');
            return;
        }

        amount = Number(amount);

        if (isNaN(amount) || amount < 1) {
            this.history.push(`loadCash: false, incorrect input ${this.current_type}: ${this.current_user.number} `
                + new Date().toUTCString());
            console.log('incorrect input');
            return;
        }
        this.cash += amount;
        // noinspection JSPrimitiveTypeWrapperUsage
        this.current_user.debet += amount;
        console.log(`you load ${amount} money, your debet is ${this.current_user.debet}`);
        this.history.push(`loadCash: true, ${this.current_type}: ${this.current_user.number} load ${amount} `
           + new Date().toUTCString());
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (!this.is_auth) {
            this.history.push('load_cash: false, not authorized ' + new Date().toUTCString());
            console.log('do authorization pls');
            return;
        }
        if (this.current_type !== 'admin') {
            this.history.push('load_cash: false, not admin ' + new Date().toUTCString());
            console.log('access denied');
            return;
        }

        addition = Number(addition);

        if (isNaN(addition) || addition < 1) {
            console.log('incorrect input');
            this.history.push('load_cash: false, incorrect input ' + new Date().toUTCString());
            return;
        }

        this.cash += addition;
        console.log('you load ' + addition + ' money in ATM, now ATM have ' + this.cash);
        this.history.push(`load_cash: true, load cash in ATM ${this.current_type}: `
            + `${this.current_user.number} load: ${addition} ` + new Date().toUTCString());
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (!this.is_auth) {
            console.log('you not authorized');
            this.history.push('getReport: false, not authorization ' + new Date().toUTCString());
            return;
        }

        if (this.current_type !== 'admin') {
            console.log('access denied');
            this.history.push('getReport: false, not admin ' + new Date().toUTCString());
            return;
        }
        console.log(`cash: ${this.cash}\nLast operation: ${this.history[this.history.length - 1]}`);
        this.history.push(`getReport: true, ${this.current_type}: ${this.current_user.number} ` + new Date().toUTCString());
    },
    // log out
    logout: function() {
        if (!this.is_auth) {
            this.history.push('logout:  not a logged ' + new Date().toUTCString());
            console.log('you not a logged');
            return;
        }
        this.history.push(`logout: true ${this.current_type}: ${this.current_user.number} ` + new Date().toUTCString());
        console.log('Logout ok');
        this.is_auth = false;
        this.current_user = false;
        this.current_type= false;
    },
};
