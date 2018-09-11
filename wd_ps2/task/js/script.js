
/** Task 1 */
function sumFirstTask(firstElement, secondElement) {
    let result = 0;
    firstElement = firstElement.value;
    secondElement = secondElement.value;
    let element = document.getElementById("sum_1");
    const minValue = -1000;
    const maxValue = 1000;

    // Check the numbers
    if (!isNumeric(firstElement) || !isNumeric(secondElement)) {
        element.innerHTML = "Wrong input <br>";
        element.style.color = "darkOrange";
        return;
    }
    // convert to number
    firstElement = Number(firstElement);
    secondElement = Number(secondElement);
    // validate
    if (firstElement < minValue || secondElement > maxValue || firstElement > secondElement) {
        element.innerHTML = "Index can be -1000 to 1000 <br> and start index <= end index <br>";
        element.style.color = "darkOrange";
        return;
    }
    for (let i = firstElement; i <= secondElement; i++) {
        result += i;
    }
    element.style.color = "black";
    element.innerHTML = result + "<br>";
}

/** Task 2 */
function sumWithFilter(firstElement, secondElement, positions) {
    let result = 0;
    firstElement = firstElement.value;
    secondElement = secondElement.value;
    positions = positions.value;
    let element = document.getElementById("sum_2");
    const minValue = -1000;
    const maxValue = 1000;

    element.style.color = "darkOrange";

    // Check the numbers
    if (!isNumeric(firstElement) || !isNumeric(secondElement)) {
        element.innerHTML = "Wrong input <br>";
        element.style.color = "darkOrange";
        return;
    }

    firstElement = Number(firstElement);
    secondElement = Number(secondElement);

    if (positions !== "" && !isNumericWithComma(positions)) {
        element.innerHTML = "Incorrect positions <br>";
        return;
    }

    if (firstElement < minValue || secondElement > maxValue || firstElement > secondElement) {
        element.innerHTML = "Index can be -1000 to 1000 <br> and start index < end index <br>";
        return;
    }

    //get positions in massive
    let positionArray = "";
    if (positions !== "") {
        positionArray = positions.split(",");
    }

    for (let i = firstElement; i <= secondElement; i++) {
        if (positionArray === "" || contains(positionArray, Math.abs(i % 10))) {
            result += i;
        }
    }
    element.style.color = "black";
    element.innerHTML = result + "";
}

/** Task 3 */
function printStars(countStars) {
    countStars = countStars.value;
    let element = document.getElementById("stars_50");
    // Check the numbers
    if (!isNumericPositive(countStars)) {
        element.innerHTML = "Wrong input <br>";
        element.style.color = "darkOrange";
        return;
    }
    let result = "";
    countStars = Number(countStars);
    for (let i = 1; i <= countStars; i++) {
        for(let j = 0; j < i; j++)
            result += "*";
        result += "<br/>";
    }
    element.style.color = "black";
    element.innerHTML = result;
}

/** Task 4 */
function getDateTime(second) {
    const secondsInHour = 3600;
    const secondsInMinutes = 60;
    const decimal = 10;
    let element = document.getElementById("full_time");
    second = second.value;
    if (!isNumericPositive(second)) {
        element.innerHTML = "Wrong input <br>";
        element.style.color = "darkOrange";
        return;
    }

    let hour = Math.floor(second / secondsInHour);
    second -= secondsInHour * hour;
    let minutes = Math.floor(second / secondsInMinutes);
    second -= secondsInMinutes * minutes;

    if (hour < decimal)
        hour = "0" + hour;
    if (minutes < decimal)
        minutes = "0" + minutes;
    if (second < decimal)
        second = "0" + second;

    element.style.color = "black";
    element.innerHTML = hour + ":" + minutes + ":" + second;
}

/** Task 5 */
function printAge(years) {
    years = years.value;
    let element = document.getElementById("age");
    if (!isNumericPositive(years)) {
        element.innerHTML = "Wrong input <br>";
        element.style.color = "darkOrange";
        return;
    }

    years = Number(years);
    let fraze = "лет";
    if (years < 1 || years > 110)
        fraze = "бред";
    if (years % 10 === 1)
        fraze = "год";
    if (years % 10 === 2 || years % 10 === 3 || years % 10 === 4)
        fraze = "года";
    if (years > 10 && years < 15)
        fraze = "лет";
    element.style.color = "black";
    element.innerHTML = (years + " " + fraze);
}

/** Task 6 */
function intervalDate(firstData, secondData) {

    let mounts = [  "january",  "february", "march",        "april",    "may",      "june",
                    "july",     "august",   "september",    "october",  "november", "december"];
    let daysInMounts = [31,28,31,30,31,30,31,31,30,31,30,31];

    firstData = firstData.value;
    secondData = secondData.value;

    /**todo checks*/

    // remove duplicate space
    firstData = firstData.replace(","," ");
    secondData = secondData.replace(","," ");
    while (firstData.match(/\s{2,}/) || secondData.match(/\s{2,}/)) {
        firstData = firstData.replace(/\s{2,}/, " ");
        secondData = secondData.replace(/\s{2,}/, " ");
    }

    // create massive
    firstData = firstData.split(" ");
    secondData = secondData.split(" ");
    let startTime = firstData[3].split(":");
    let endTime = secondData[3].split(":");

    // get date
    let startMount = mounts.indexOf(firstData[0].toLowerCase());    //  0-11
    let endMount = mounts.indexOf(secondData[0].toLowerCase());                   //  0-11
    let startDay = Number(firstData[1]);
    let endDay = Number(secondData[1]);
    let startYear = Number(firstData[2]);
    let endYear = Number(secondData[2]);

    let startHour = Number(startTime[0]);
    let startMin = Number(startTime[1]);
    let startSec = Number(startTime[2]);
    let endHour = Number(endTime[0]);
    let endMin = Number(endTime[1]);
    let endSec = Number(endTime[2]);

    let startDate = new Date(startYear, startMount, startDay, startHour, startMin, startSec);
    let endDate = new Date(endYear, endMount, endDay, endHour, endMin, endSec);

    let date_1970 = new Date(0);

    let oneYear = +new Date(2003,0,1) - +new Date(2002,0,1);

    endDate = new Date(1000);

    alert(oneYear + " " + date_1970 + " " + (Number(oneYear) + date_1970));









    let startYearPoint = 0;
    while (startYear % 4 !== 0) {
        startYear++;
        startYearPoint++;
    }
    endYear = endYear + startYearPoint - startYear + startYearPoint;
    startYear = startYearPoint;
    let passedYear = endYear - startYear;







    firstData = firstData.value;
    secondData = secondData.value;
    let element = document.getElementById("interval");
    let intervalDate;

    element.style.color = "black";
    element.innerHTML = (intervalDate);
}

function zodiac(date) {
    alert(date.value);
}

function chessBoard(chessBoardLength) {
    
}

function findRoom(roomNumber, stages, entrance, roomsInStage) {
    roomNumber = roomNumber.value;
    stages = stages.value;
    entrance = entrance.value;
    roomsInStage = roomsInStage.value;

    let element = document.getElementById("room");
    let roomsInEntrance = stages * roomsInStage;

    let currentEntrance = Math.floor(roomNumber / roomsInEntrance);
    roomNumber -= roomsInEntrance * currentEntrance;
    let currentStage = Math.floor(roomNumber / roomsInStage);
    currentEntrance += 1;
    currentStage += 1;

    element.innerHTML = ("Entrance = " + currentEntrance + " stage = " + currentStage );
}

function task_10(number) {
    let sum = 0;
    while (number !== 0) {
        sum += number % 10;
        number -= number % 10;
        number /= 10;
    }
    document.write(sum + "");
}

function task_11() {

}

function test() {
    for (let i = 0; i < 100; i++) {
        task_5(i);
        document.write("<br/>")
    }
}

function isNumeric(value) {
    return value.match(/^[-]?[0-9]*[0-9]$/);
}

function isNumericPositive(value) {
    return value.match(/^[0-9]*[0-9]$/);
}

function isNumericWithComma(value) {
    return value.match(/^[0-9]([,][0-9])*$/);
}

function contains(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === value)
            return true;
    }
    return false;
}

