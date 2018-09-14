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
    for (let i = 0; i <= countSymbols; i++) {
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

    //maybe not need
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
                    result += "<div class='board-red'></div>"
                else
                    result += "<div class='board-black'></div>"
            else
                if (j % 2 === 0)
                    result += "<div class='board-black'></div>"
                else
                    result += "<div class='board-red'></div>"
        }
        result += "</div>";
    }

    result += "</div>"

    print(result);

}













function print(data) {
    let element = document.getElementsByClassName("content__result_area");
    element[0].style.color = "black";
    element[0].innerHTML = data;
}

function printError(data) {
    let element = document.getElementsByClassName("content__result_area");
    element[0].style.color = "orange";
    element[0].innerHTML = data;
}

function isNumeric(value) {
    return value.match(/^[-]?[0-9]+$/);
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