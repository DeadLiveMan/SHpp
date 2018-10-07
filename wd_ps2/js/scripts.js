/********************************************
 *                                          *
 * Tasks for SH++ FullStack WEB Developer   *
 * @author Sergey Kryvenko                  *
 *                                          *
 ********************************************/

const minNumber = -1000;
const maxNumber = 1000;
const decimalNumber = 10;
const hundred = 100;
const secondsInHour = 3600;
const secondsInMinute = 60;
const maxMonth = 12;
const maxDay = 31;
const maxSizeBoard = 100;
const incorrectInput = "Incorrect input";
const incorrectInputFilter = "Incorrect input: Wrong filter";
const incorrectInputDateFormat = "Incorrect input: invalid format date";
const incorrectInputDateWrong = "Incorrect input: wrong date";
const incorrectSizeLarge = "Very large size";
const errorColor = "orange";

const regFormatDateFull = /^[a-zA-Z]{3,9}\s\d{1,2},\s?\d{1,4}\s(\d{2}:){2}\d{2}$/;
const resultArea = document.getElementsByClassName("content__result_area");

/** Task 1*/
function sumFirst(firstElement, secondElement) {
    let firstNumber = Number(firstElement.value);
    let secondNumber = Number(secondElement.value);

    if (isNaN(firstNumber) || isNaN(secondNumber) ||
            firstNumber < minNumber || secondNumber > maxNumber) {
        print(incorrectInput, errorColor);
        return;
    }

    if (firstNumber > secondNumber) {
        [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    let result = 0;
    for (let i = firstNumber; i <= secondNumber; i++) {
        result += i;
    }
    print(result);
}

/** Task 2*/
function sumSecond(firstElement, secondElement, thirdElement) {
    const firstNumber = Number(firstElement.value);
    const secondNumber = Number(secondElement.value);
    let filter = thirdElement.value;

    if (!isCommaParser(filter)) {
        print(incorrectInputFilter, errorColor);
        return;
    }
    filter = filter.split(",");
    if (isNaN(firstNumber) || isNaN(secondNumber) || firstNumber < minNumber || secondNumber > maxNumber) {
        print(incorrectInput, errorColor);
        return;
    }

    if (firstNumber > secondNumber) {
        [firstNumber, secondNumber] = [secondNumber, firstNumber];
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
        print(incorrectInput, errorColor);
        return;
    }

    let result = "";
    for (let i = 1; i <= countSymbols; i++) {
            result += "".padStart(i,symbol) + "<br>";
    }
    print(result);
}
/** Task 4 */
function countTime(element) {
    let seconds = Number(element.value);

    if (!isNumericPositive(seconds)) {
        print(incorrectInput, errorColor);
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
        print(incorrectInput, errorColor);
        return;
    }
    years = addDecline(years ,["лет", "год", "года"]);
    print(years);
}

/** Task 6 */
function dateInterval(firstElement, secondElement) {
    const firstDate = firstElement.value;
    const secondDate = secondElement.value;

    if (!regFormatDateFull.test(firstDate) || !regFormatDateFull.test(secondDate)) {
        print(incorrectInputDateFormat, errorColor);
        return;
    }

    let startDate =  new Date(firstDate);
    let endDate = new Date(secondDate);

    const firstDateDay = firstDate.substr(firstDate.indexOf(" ") + 1, firstDate.indexOf(",") - firstDate.indexOf(" ") - 1);
    const secondDateDay = secondDate.substr(secondDate.indexOf(" ") + 1, secondDate.indexOf(",") - secondDate.indexOf(" ") - 1);

    if (Number(firstDateDay) !== startDate.getDate() || Number(secondDateDay) !== endDate.getDate()) {
        print(incorrectInputDateWrong, errorColor);
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

    const interval = new DateInterval(resultDate.getFullYear() - startDate.getFullYear(),
                                    resultDate.getMonth(),
                                    resultDate.getDate() - 1,
                                    resultDate.getHours(),
                                    resultDate.getMinutes(),
                                    resultDate.getSeconds()
    );
    print(interval.toString());
}

/** Task 7 */
function zodiac(element) {
    let date = element.value;
    if (!(/^\d{4}-\d{1,2}-\d{1,2}$/).test(date)) {
        print(incorrectInputDateFormat, errorColor);
        return;
    }
    let checkDate = new Date(date);
    date = date.split("-");

    if (date.length < 3) {
        print(incorrectInput, errorColor);
        return;
    }

    if (Number(date[2]) !== checkDate.getDate()) {
        print(incorrectInputDateWrong, errorColor);
        return;
    }

    const zodiacArray = [
        ["водолей", 12,"aquarius.png"],         //  1-2
        ["рыбы",    20,"pisces.png"],           //  2-3
        ["овен",    21,"aries.png"],            //  3-4
        ["телец",   21,"taurus.png"],           //  4-5
        ["близнецы",22,"gemini.png"],           //  5-6
        ["рак",     22,"cancer.png"],           //  6-7
        ["лев",     23,"leo.png"],              //  7-8
        ["дева",    22,"virgo.png"],            //  8-9
        ["весы",    24,"libra.png"],            //  9-10
        ["скорпион",24,"scorpio.png"],          //  10-11
        ["стрелец", 23,"sagittarius.png"],      //  11-12
        ["козерог", 23,"capricorn.png"],        //  12-1

        ["змееносец", 0,"ophiuchus.png"]        // coming soon
    ];

    let posArray = 0;
    let month = Number(date[1]);
    let day = Number(date[2]);

    if (!isNumericPositive(month) || !isNumericPositive(day) || month > maxMonth || day > maxDay) {
        print(incorrectInput, errorColor);
        return;
    }
    month = month - 1;
    if (month < 0 || day < 1) {
        print(incorrectInput, errorColor);
        return;
    }

    (day >= zodiacArray[month][1])?posArray = month:posArray = month - 1;
    if (posArray < 0) {
        posArray = maxMonth - 1;
    }

    print(zodiacArray[posArray][0].toUpperCase() + "<br><img src='images-zodiac/" + zodiacArray[posArray][2] + "'>");
}

/** Task 8 */
function chessBoard(element) {
    let sizeBoard = element.value;

    sizeBoard = sizeBoard.toLowerCase();
    sizeBoard = sizeBoard.replace("х", "x");

    if (!(/^[0-9]+[x][0-9]+$/).test(sizeBoard)) {
        print(incorrectInput, errorColor);
        return;
    }
    sizeBoard = sizeBoard.split("x");
    const xBoard = sizeBoard[0];
    const yBoard = sizeBoard[1];

    if ([xBoard, yBoard].some(value => value > maxSizeBoard)) {
        print(incorrectSizeLarge, errorColor);
        return;
    }

    let elementDivContainer = document.createElement('div');
    elementDivContainer.setAttribute('class', 'board-container');

    for (let i = 0; i < yBoard; i++) {
        let elementDivBoardColumn = document.createElement('div');
        elementDivBoardColumn.setAttribute('class', 'board-column');
        for (let j = 0; j < xBoard; j++) {
            const elementDivRect = document.createElement('div');
            ((i + j) % 2 === 0)?elementDivRect.setAttribute('class', 'board-light') : elementDivRect.setAttribute('class', 'board-black');
            elementDivBoardColumn.insertAdjacentElement("afterbegin", elementDivRect);
        }
        elementDivContainer.insertAdjacentElement("afterbegin", elementDivBoardColumn);
    }
    print(elementDivContainer.innerHTML);
}

/** Task 9 */
function findRoom(firstElement, secondElement, thirdElement, fourthElement) {
    let roomNumber = Number(firstElement.value);
    let stages = Number(secondElement.value);
    let entrance = Number(thirdElement.value);
    let roomsInStage = Number(fourthElement.value);

    if ([roomNumber, stages, entrance, roomsInStage].some(value => !isNumericPositive(value - 1))) {
        print(incorrectInput, errorColor);
        return;
    }

    roomNumber--;

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

    number = number.replace(/[\-.]/g,"");

    if (!isNumericPositive(Number(number))) {
        print(incorrectInput, errorColor);
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

    if (links === "") {
        return;
    }

    links = links.replace(/\s/g,"");
    links = links.split(",");
    links.sort();

    let linkName = "";

    let elementResultDiv = document.createElement('div');
    let elementDiv = document.createElement('div');
    elementResultDiv.appendChild(elementDiv);
    elementDiv.setAttribute("class", "content__result_links");

    for (let i = 0; i < links.length; i++) {
        linkName = links[i].replace(/https?:\/\//g,"");
        if (linkName === links[i]) {
            links[i] = "http://" + links[i];
        }
        if (isLink(linkName)) {
            let elementLink = document.createElement("a");
            elementLink.setAttribute("href", links[i]);
            elementLink.insertAdjacentText("afterbegin", linkName);
            elementDiv.appendChild(elementLink);
        }
    }
    print(elementResultDiv.innerHTML);
}

function addDecline(value, arrayDeclines) {
    let word = arrayDeclines[0];
    const lastNum = value % decimalNumber;
    const last2Num = value % hundred;
    const elevenToFourteen = last2Num > 10 && last2Num < 15;

    if (lastNum === 1 && !elevenToFourteen) {
        word = arrayDeclines[1];
    }
    if (lastNum > 1 && lastNum < 5  && !elevenToFourteen) {
        word = arrayDeclines[2];
    }
    return value + " " + word;
}

function print(data, color) {
    color = color || "black";
    resultArea[0].style.color = color;
    resultArea[0].innerHTML = data;
}

function isLink(value) {
    return (/^\w+(((\.)|(\/))\w+)+\/?$/).test(value);
}

function isNumericPositive(value) {
    return !isNaN(value) && value > 0;
}

function isCommaParser(value) {
    return (/(^[0-9]([,][0-9])*$)/).test(value);
}

class DateInterval {
    constructor(year, month, day, hour, minute, seconds) {
        this.date = [   addDecline(year, ["лет", "год", "года"]),
                        addDecline(month, ["месяцев", "месяц", "месяца"]),
                        addDecline(day, ["дней", "день", "дня"]),
                        addDecline(hour, ["часов", "час", "часа"]),
                        addDecline(minute, ["минут", "минута", "минуты"]),
                        addDecline(seconds, ["секунд", "секунда", "секунды"])
        ];
    }

    toString() {
        const br = "<br>";
        const reducer = (accumulator, value) => accumulator + br + value;
        return this.date.reduce(reducer);
    }
}