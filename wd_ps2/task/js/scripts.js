/********************************************
 *                                          *
 * Tasks for SH++ FullStack WEB Developer   *
 * @author Sergey Kryvenko                  *
 *                                          *
 ********************************************/

function sumFirst(minValue, maxValue) {
    minValue = minValue.value;
    maxValue = maxValue.value;
    const min = -1000;
    const max = 1000;

    if (!isNumeric(minValue) || !isNumeric(maxValue)) {
        printError("Incorrect input");
        return;
    }

    minValue = Number(minValue);
    maxValue = Number(maxValue);
    if (minValue < min || maxValue > max || minValue > maxValue) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = minValue; i <= maxValue; i++) {
        result += i;
    }
    print(result);
}

function sumSecond(minValue, maxValue, positions) {
    minValue = minValue.value;
    maxValue = maxValue.value;
    positions = positions.value;

    if (!isNumeric(minValue) || !isNumeric(maxValue)) {
        printError("Incorrect input");
        return;
    }

    if (!isCommaParser(positions)) {
        printError("Incorrect input: Wrong filter");
        return;
    }

    const min = -1000;
    const max = 1000;
    minValue = Number(minValue);
    maxValue = Number(maxValue);
    if (minValue < min || maxValue > max || minValue > maxValue) {
        printError("Incorrect input: out of bounds");
        return;
    }

    let filter = positions.split(",");

    let result = 0;
    for (let i = minValue; i <= maxValue; i++) {
        if (contains(i % 10,filter))
            result += i;
    }
    print(result);
}

function printElements(countSymbols, symbol) {
    countSymbols = countSymbols.value;
    symbol = symbol.value;

    if (!isNumericPositive(countSymbols) || symbol.length !== 1) {
        printError("Incorrect input");
        return;
    }

    let result = "";
    countSymbols = Number(countSymbols);
    for (let i = 1; i <= countSymbols; i++) {
        for (let j = 0; j < i; j++) {
            result += symbol;
        }
        result += "<br>";
    }
    print(result);
}

function countTime(seconds) {
    seconds = seconds.value;

    if (!isNumericPositive(seconds)) {
        printError("Incorrect input");
        return;
    }

    const secondsInHour = 3600;
    const secondsInMinute = 60;
    const decimal = 10;
    const hoursInDay = 24;

    let hour = Math.floor(seconds / secondsInHour);
    seconds -= hour * secondsInHour;
    let minute = Math.floor(seconds / secondsInMinute);
    seconds -= minute * secondsInMinute;

    //maybe not need (only time 0 - 23 hour)
    if (hour >= hoursInDay)
        hour = hour % hoursInDay;

    // formatting for 2 decimal
    if (seconds < decimal)
        seconds = "0" + seconds;
    if (minute < decimal)
        minute = "0" + minute;
    if (hour < decimal)
        hour = "0" + hour;

    print(hour + ":" + minute + ":" + seconds);
}

function countYear(years) {
    years = years.value;
    let word = "лет";
    if (!isNumericPositive(years)) {
        printError("Incorrect input");
        return;
    }
    years = Number(years);
    if (years % 10 === 1)
        word = "год";
    if ((years % 10 > 1) && (years % 10 < 5))
        word = "года";
    if (years % 100 > 10 && years % 100 < 15)
        word = "лет";
    if (years > 110)
        word += ": сомнительно";

    print(years + " " + word);
}

//todo fixme please!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function dateInterval(startDate, endDate) {
    startDate = startDate.value;
    endDate = endDate.value;
    let mounthsArray = [
        "january",  31,
        "february", 28,
        "march",    31,
        "april",    30,
        "may",      31,
        "june",     30,
        "july",     31,
        "august",   31,
        "september",30,
        "october",  31,
        "november", 30,
        "december", 31,
        ];
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let date = endDate - startDate;
    alert(new Date(date));

    // startDate = startDate.replace(","," ");
    // startDate = startDate.replace(/\s+/g," ");
    // startDate = startDate.split(" ");
    // endDate = endDate.replace(","," ");
    // endDate = endDate.replace(/\s+/g," ");
    // endDate = endDate.split(" ");
    //
    // let starMonth = startDate[0];
    // let startDay = startDate[1];
    // let startYear = startDate[2];
    // let startTime = startDate[3];
    // startTime = startTime.split(":");
    // let startHour = startTime[0];
    // let startMinute = startTime[1];
    // let startSecond = startTime[2];
    //
    // let endMonth = endDate[0];
    // let endDay = endDate[1];
    // let endYear = endDate[2];
    // let endTime = endDate[3];
    // endTime = endTime.split(":");
    // let endHour = endTime[0];
    // let endMinute = endTime[1];
    // let endSecond = endTime[2];

    print(startDate + " " + endDate);
}

function zodiac(date) {
    date = date.value;
    date = date.split("-");

    const zodiacArray = [
        ["водолей", [12,19],"aquarius.png"],        //  1-2
        ["рыбы",    [20,20],"pisces.png"],          //  2-3
        ["овен",    [21,20],"aries.png"],           //  3-4
        ["телец",   [21,21],"taurus.png"],
        ["близнецы",[22,21],"gemini.png"],
        ["рак",     [22,22],"cancer.png"],
        ["лев",     [23,21],"leo.png"],
        ["дева",    [22,23],"virgo.png"],
        ["весы",    [24,23],"libra.png"],
        ["скорпион",[24,22],"scorpio.png"],
        ["стрелец", [23,22],"sagittarius.png"],
        ["козерог", [23,20],"capricorn.png"],

        ["змееносец",[0,0],"ophiuchus.png"]
    ];
    const maxMonth = 12;
    const maxDay = 31;

    if (date.length < 3) {
        printError("Incorrect input");
        return;
    }

    let posArray = 0;
    let month = date[1];
    let day = date[2];

    if (!isNumericPositive(month) || !isNumericPositive(day) || month > maxMonth || day > maxDay) {
        printError("Incorrect input");
        return;
    }

    month = Number(month) - 1;
    day = Number(day);

    if (month < 0 || day < 1) {
        printError("Incorrect input");
        return;
    }

    if (day >= zodiacArray[month][1][0])
        posArray = month;
    else
        posArray = month - 1;
    if (posArray < 0)
        posArray = maxMonth - 1;

    print(zodiacArray[posArray][0].toUpperCase() + "<br><img src='image/zodiac/" + zodiacArray[posArray][2] + "'>");
}

function chessBoard(size) {
    size = size.value;

    size = size.toLowerCase();
    size = size.replace("х","x");

    if (!size.match(/^[0-9]+[x][0-9]+$/)) {
        printError("Incorrect input");
        return;
    }

    size = size.split("x");

    let xBoard = size[0];
    let yBoard = size[1];

    let result = "<div class='board-container'>";

    for (let i = 0; i < yBoard; i++) {
        result += "<div class='board-column'>";
        for (let j = 0; j < xBoard; j++) {
            if(i % 2 === 0)
                if (j % 2 === 0)
                    result += "<div class='board-light'></div>";
                else
                    result += "<div class='board-black'></div>";
            else
                if (j % 2 === 0)
                    result += "<div class='board-black'></div>";
                else
                    result += "<div class='board-light'></div>";
        }
        result += "</div>";
    }
    result += "</div>";
    print(result);
}

function findRoom(roomNumber, stages, entrance, roomsInStage) {
    roomNumber = roomNumber.value;
    stages = stages.value;
    entrance = entrance.value;
    roomsInStage = roomsInStage.value;

    if (!isNumericPositive(roomNumber) || !isNumericPositive(stages) ||
        !isNumericPositive(entrance) || !isNumericPositive(roomsInStage)) {
        printError("Incorrect input");
        return;
    }

    roomNumber = Number(roomNumber) - 1;
    stages = Number(stages);
    entrance = Number(entrance);
    roomsInStage = Number(roomsInStage);

    if (roomNumber < 0 || stages < 1 || entrance < 1 || roomsInStage < 1) {
        printError("Incorrect input");
        return;
    }

    let roomsInEntrance = stages * roomsInStage;

    let currentEntrance = Math.floor(roomNumber / roomsInEntrance);
    roomNumber -= roomsInEntrance * currentEntrance;
    let currentStage = Math.floor(roomNumber / roomsInStage);
    currentEntrance += 1;
    currentStage += 1;

    if (currentEntrance > entrance) {
        print("Квартира с таким номером не существует в этом доме");
        return;
    }
    print(currentEntrance + " Подъезд " + currentStage + " этаж");
}

function sumNumber(number) {
    number = number.value;

    if (!isNumericPositive(number)) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = 0; i < number.length; i++)
        result += Number(number[i]);
    print(result);
}

function parseLinks() {
    let links = document.getElementsByClassName("text-area")[0].value;

    if (links === "")
        return;

    links = links.replace(/\s/g,"");
    links = links.split(",");
    links.sort();

    let result = "";
    let linkName = "";

    for (let i = 0; i < links.length; i++) {
        linkName = links[i].replace(/http:\/\//g,"");
        if (isLink(links[i])) {
            result += '<a href="' + links[i] + '">' + linkName + '</a>';
            if (i !== links.length - 1)
                result += "<br>";
        }
    }
    print(result);
}







const resultArea = document.getElementsByClassName("content__result_area");

function print(data) {
    resultArea[0].style.color = "black";
    resultArea[0].innerHTML = data;
}

function printError(data) {
    resultArea[0].style.color = "orange";
    resultArea[0].innerHTML = data;
}

function isNumeric(value) {
    return value.match(/^[-]?[0-9]+$/);
}

function isLink(value) {
    return value.match(/^\w+.*[\w\/]$/);
}

function isNumericPositive(value) {
    return value.match(/^[0-9]+$/);
}

function isCommaParser(value) {
    return value.match(/(^[0-9]([,][0-9])*$)/);
}

function contains(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (Number(array[i]) === value)
            return true;
    }
    return false;
}