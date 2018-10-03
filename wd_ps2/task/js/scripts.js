/********************************************
 *                                          *
 * Tasks for SH++ FullStack WEB Developer   *
 * @author Sergey Kryvenko                  *
 *                                          *
 ********************************************/

const minNumber = -1000;
const maxNumber = 1000;
const decimalNumber = 10;
const secondsInHour = 3600;
const secondsInMinute = 60;
const maxMonth = 12;
const maxDay = 31;
const maxSizeBoard = 100;

const regFormatDateFull = /^[a-zA-Z]+\s\d{1,2},\s?\d{1,4}\s(\d{2}:){2}\d{2}$/;
const resultArea = document.getElementsByClassName("content__result_area");

/** Task 1*/
function sumFirst(firstElement, secondElement) {
    let firstNumber = firstElement.value;
    let secondNumber = secondElement.value;

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber) ||
            firstNumber < minNumber || secondNumber > maxNumber || firstNumber > secondNumber) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = firstNumber; i <= secondNumber; i++) {
        result += i;
    }
    print(result);
}

/** Task 2*/
function sumSecond(firstElement, secondElement, thirdElement) {
    let firstNumber = Number(firstElement.value);
    let secondNumber = Number(secondElement.value);
    let filter = thirdElement.value;

    if (!isCommaParser(filter)) {
        printError("Incorrect input: Wrong filter");
        return;
    }
    filter = filter.split(",");
    if (isNaN(firstNumber) || isNaN(secondNumber) ||
            firstNumber < minNumber || secondNumber > maxNumber || firstNumber > secondNumber) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = firstNumber; i <= secondNumber; i++) {
        if (filter.includes(Math.abs(i % decimalNumber) + "")) {
            result += i;
        }
    }
    print(result);
}

/** Task 3 */
function printElements(firstElement, secondElement) {
    let countSymbols = Number(firstElement.value);
    const symbol = secondElement.value;

    if (!isNumericPositive(countSymbols) || symbol.length !== 1) {
        printError("Incorrect input");
        return;
    }

    let result = "";
    for (let i = 1; i <= countSymbols; i++) {
        for (let j = 0; j < i; j++) {
            result += symbol;
        }
        result += "<br>";
    }
    print(result);
}
/** Task 4 */
function countTime(element) {
    let seconds = Number(element.value);

    if (!isNumericPositive(seconds)) {
        printError("Incorrect input");
        return;
    }

    let hour = Math.floor(seconds / secondsInHour);
    seconds -= hour * secondsInHour;
    let minute = Math.floor(seconds / secondsInMinute);
    seconds -= (minute * secondsInMinute);

    print(hour.toString().padStart(2,"0") + ":" + minute.toString().padStart(2,"0") + ":" + seconds.toString().padStart(2,"0"));
}

/** Task 5 */
function countYear(element) {
    let years = Number(element.value);
    if (!isNumericPositive(years)) {
        printError("Incorrect input");
        return;
    }
    years = addDecline(years ,"лет", "год", "года");
    print(years);
}

/** Task 6 */
function dateInterval(firstElement, secondElement) {

    if (!firstElement.value.match(regFormatDateFull) || !secondElement.value.match(regFormatDateFull)) {
        printError("Incorrect input: invalid format date");
        return;
    }

    const firstDate = firstElement.value;
    const secondDate = secondElement.value;

    let startDate =  new Date(firstDate);
    let endDate = new Date(secondDate);

    const firstDateDay = firstDate.substr(firstDate.indexOf(" ") + 1, firstDate.indexOf(",") - firstDate.indexOf(" ") - 1);
    const secondDateDay = secondDate.substr(secondDate.indexOf(" ") + 1, secondDate.indexOf(",") - secondDate.indexOf(" ") - 1);

    if (Number(firstDateDay) !== startDate.getDate() || Number(secondDateDay) !== endDate.getDate()) {
        printError("Incorrect input: wrong date");
        return;
    }

    if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
    }

    let resultDate = new Date(0);
    resultDate.setFullYear((endDate.getFullYear() - startDate.getFullYear() + startDate.getFullYear()));
    resultDate.setMonth((endDate.getMonth() - startDate.getMonth() + startDate.getMonth()));
    resultDate.setDate((endDate.getDate() - startDate.getDate()) + 1);
    resultDate.setHours((endDate.getHours() - startDate.getHours()));
    resultDate.setMinutes((endDate.getMinutes() - startDate.getMinutes()));
    resultDate.setSeconds((endDate.getSeconds() - startDate.getSeconds()));
    resultDate.setMonth((resultDate.getMonth() - startDate.getMonth()));

    let year = resultDate.getFullYear() - startDate.getFullYear();
    let month = resultDate.getMonth();
    let day = resultDate.getDate() - 1;
    let hours = resultDate.getHours();
    let minutes = resultDate.getMinutes();
    let second = resultDate.getSeconds();

    year = addDecline(year, "лет", "год", "года");
    month = addDecline(month, "месяцев", "месяц", "месяца");
    day = addDecline(day, "дней", "день", "дня");
    hours = addDecline(hours, "часов", "час", "часа");
    minutes = addDecline(minutes, "минут", "минута", "минуты");
    second = addDecline(second, "секунд", "секунда", "секунды");

    print(`${year}<br>${month}<br>${day}<br>${hours}<br>${minutes}<br>${second}`);
}

/** Task 7 */
function zodiac(element) {
    let date = element.value;
    if (!date.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
        printError("Incorrect input: invalid format date");
        return;
    }
    date = date.split("-");
    let checkDate = new Date(0);
    checkDate.setFullYear(date[0]);
    checkDate.setMonth(date[1] - 1);
    checkDate.setDate(date[2]);

    if (Number(date[2]) !== checkDate.getDate()) {
        printError("Incorrect input: wrong date");
        return;
    }

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

/** Task 8 */
function chessBoard(element) {
    let sizeBoard = element.value;

    sizeBoard = sizeBoard.toLowerCase();
    sizeBoard = sizeBoard.replace("х","x");

    if (!sizeBoard.match(/^[0-9]+[x][0-9]+$/)) {
        printError("Incorrect input");
        return;
    }
    sizeBoard = sizeBoard.split("x");
    const xBoard = sizeBoard[0];
    const yBoard = sizeBoard[1];

    if ([xBoard, yBoard].some(value => value > maxSizeBoard)) {
        printError("Very large size");
        return;
    }

    let result = "<div class='board-container'>";

    for (let i = 0; i < yBoard; i++) {
        result += "<div class='board-column'>";
        for (let j = 0; j < xBoard; j++)
            if(i % 2 === 0)
                (j % 2 === 0)?result += "<div class='board-light'></div>":result += "<div class='board-black'></div>";
            else
                (j % 2 === 0)?result += "<div class='board-black'></div>":result += "<div class='board-light'></div>";
        result += "</div>";
    }
    result += "</div>";
    print(result);
}

/** Task 9 */
function findRoom(firstElement, secondElement, thirdElement, fourthElement) {
    let roomNumber = Number(firstElement.value) - 1;
    let stages = Number(secondElement.value);
    let entrance = Number(thirdElement.value);
    let roomsInStage = Number(fourthElement.value);

    if ([roomNumber, stages - 1, entrance - 1, roomsInStage - 1].some(value => !isNumericPositive(value))) {
        printError("Incorrect input: value need be > 0");
        return;
    }

    const roomsInEntrance = stages * roomsInStage;

    let currentEntrance = Math.floor(roomNumber / roomsInEntrance);
    roomNumber -= roomsInEntrance * currentEntrance;
    let currentStage = Math.floor(roomNumber / roomsInStage);
    currentEntrance += 1;
    currentStage += 1;

    if (currentEntrance > entrance) {
        print("this room not exist in this build");
        return;
    }
    print(currentEntrance + " Подъезд " + currentStage + " этаж");
}

/** Task 10 */
function sumNumber(element) {
    let number = element.value;

    number = number.replace(/[\-]/,"");
    number = number.replace(/[.]/,"");

    if (!isNumericPositive(Number(number))) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = 0; i < number.length; i++)
        result += Number(number[i]);

    print(result);
}

/** Task 11 */
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
        linkName = links[i].replace(/https?:\/\//g,"");
        if (linkName === links[i])
            links[i] = "http://" + links[i];

        if (isLink(links[i])) {
            result += '<a href="' + links[i] + '">' + linkName + '</a>';
            if (i !== links.length - 1)
                result += "<br>";
        }
    }
    print(result);
}

function addDecline(value, param1, param2, param3) {
    let word = param1;
    if (value % 10 === 1)
        word = param2;
    if ((value % 10 > 1) && (value % 10 < 5))
        word = param3;
    if (value % 100 > 10 && value % 100 < 15)
        word = param1;
    return value + " " + word;
}

function print(data) {
    resultArea[0].style.color = "black";
    resultArea[0].innerHTML = data;
}

function printError(data) {
    resultArea[0].style.color = "orange";
    resultArea[0].innerHTML = data;
}

function isLink(value) {
    return value.match(/^\w+.*[\w]\/?$/);
}

function isNumericPositive(value) {
    return (!isNaN(value) && (value === Math.abs(value)));
}

function isCommaParser(value) {
    return value.match(/(^[0-9]([,][0-9])*$)/);
}

