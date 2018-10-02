/********************************************
 *                                          *
 * Tasks for SH++ FullStack WEB Developer   *
 * @author Sergey Kryvenko                  *
 *                                          *
 ********************************************/

function sumFirst(firstElement, secondElement) {
    let firstNumber = firstElement.value;
    let secondNumber = secondElement.value;
    const min = -1000;
    const max = 1000;

    if (!isNumeric(firstNumber) || !isNumeric(secondNumber)) {
        printError("Incorrect input");
        return;
    }

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (firstNumber < min || secondNumber > max || firstNumber > secondNumber) {
        printError("Incorrect input");
        return;
    }

    let result = 0;
    for (let i = firstNumber; i <= secondNumber; i++) {
        result += i;
    }
    print(result);
}

function sumSecond(firstElement, secondElement, thirdElement) {
    let minValue = firstElement.value;
    let maxValue = secondElement.value;
    let filter = thirdElement.value;

    if (!isNumeric(minValue) || !isNumeric(maxValue)) {
        printError("Incorrect input");
        return;
    }

    if (!isCommaParser(filter)) {
        printError("Incorrect input: Wrong filter");
        return;
    }

    const min = -1000;
    const max = 1000;
    const decimal = 10;

    filter = filter.split(",");
    minValue = Number(minValue);
    maxValue = Number(maxValue);
    if (minValue < min || maxValue > max || minValue > maxValue) {
        printError("Incorrect input: out of bounds");
        return;
    }

    let result = 0;
    for (let i = minValue; i <= maxValue; i++) {
        if (filter.includes(Math.abs(i % decimal) + ""))
            result += i;
    }
    print(result);
}

function printElements(firstElement, secondElement) {
    let countSymbols = firstElement.value;
    let symbol = secondElement.value;

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

function countTime(element) {
    let seconds = element.value;

    if (!isNumericPositive(seconds)) {
        printError("Incorrect input");
        return;
    }

    const secondsInHour = 3600;
    const secondsInMinute = 60;

    let hour = Math.floor(seconds / secondsInHour);
    seconds -= hour * secondsInHour;
    let minute = Math.floor(seconds / secondsInMinute);
    seconds -= minute * secondsInMinute;

    // formatting for 2 decimal
    seconds = formatNumber(seconds);
    minute = formatNumber(minute);
    hour = formatNumber(hour);

    print(hour + ":" + minute + ":" + seconds);
}

function countYear(element) {
    let years = element.value;
    if (!isNumericPositive(years)) {
        printError("Incorrect input");
        return;
    }
    years = addDecline(years ,"лет", "год", "года");
    print(years);
}

function dateInterval(firstElement, secondElement) {

    const reg = /^[a-zA-Z]+\s\d{1,2},\s?\d{4}\s(\d{2}:){2}\d{2}$/;
    if (!firstElement.value.match(reg) || !secondElement.value.match(reg)) {
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

    if (startDate > endDate)
        [startDate,endDate] = [endDate, startDate];

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
    const date = [year, month, day, hours, minutes, second]; /// ???

    year = addDecline(year, "лет", "год", "года");
    month = addDecline(month, "месяцев", "месяц", "месяца");
    day = addDecline(day, "дней", "день", "дня");
    hours = addDecline(hours, "часов", "час", "часа");
    minutes = addDecline(minutes, "минут", "минута", "минуты");
    second = addDecline(second, "секунд", "секунда", "секунды");

    print(`${year}<br>${month}<br>${day}<br>${hours}<br>${minutes}<br>${second}`);
}

function zodiac(element) {
    let date = element.value;
    if (!date.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
        printError("Incorrect input");
        return;
    }
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

function chessBoard(element) {
    let size = element.value;

    size = size.toLowerCase();
    size = size.replace("х","x");

    if (!size.match(/^[0-9]+[x][0-9]+$/)) {
        printError("Incorrect input");
        return;
    }

    size = size.split("x");

    const xBoard = size[0];
    const yBoard = size[1];

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

function findRoom(firstElement, secondElement, thirdElement, fourthElement) {
    let roomNumber = firstElement.value;
    let stages = secondElement.value;
    let entrance = thirdElement.value;
    let roomsInStage = fourthElement.value;

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

    const roomsInEntrance = stages * roomsInStage;

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

function sumNumber(element) {
    let number = element.value;

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
        linkName = links[i].replace(/https?:\/\//g,"");
        if (isLink(links[i])) {
            result += '<a href="' + links[i] + '">' + linkName + '</a>';
            if (i !== links.length - 1)
                result += "<br>";
        }
    }
    print(result);
}


const resultArea = document.getElementsByClassName("content__result_area");

function formatNumber(number) {
    const decimal = 10;
    if (number < decimal)
        number = "0" + number;
    return number;
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