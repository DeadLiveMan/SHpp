
function sumFirstTask() {
    let sum = 0;
    let sum1 = document.getElementById("task_1_start").value;
    let sum2 = document.getElementById("task_1_end").value;
    let element = document.getElementById("sum_1");
    const minValue = -1000;
    const maxValue = 1000;

    // Check the numbers
    if (!isNumeric(sum1) || !isNumeric(sum2)) {
        document.getElementById("sum_1").innerHTML = "Wrong input <br>";
        document.getElementById("sum_1").style.color = "darkOrange";
        return;
    }

    sum1 = Number(sum1);
    sum2 = Number(sum2);

    if (sum1 < minValue || sum2 > maxValue || sum1 > sum2) {
        element.innerHTML = "Index can be -1000 to 1000 <br> and start index <= end index <br>";
        element.style.color = "darkOrange";
        return;
    }

    for (let i = sum1; i <= sum2; i++) {
        sum += i;
    }
    element.style.color = "black";
    element.innerHTML = sum + "<br>";
}

function sum_2() {
    let sum = 0;
    let sum1 = document.getElementById("task_2_start").value;
    let sum2 = document.getElementById("task_2_end").value;
    let positions = document.getElementById("positions").value;
    let element = document.getElementById("sum_2");
    const minValue = -1000;
    const maxValue = 1000;

    element.style.color = "darkOrange";

    // Check the numbers
    if (!isNumeric(sum1) || !isNumeric(sum2)) {
        document.getElementById("sum_1").innerHTML = "Wrong input <br>";
        document.getElementById("sum_1").style.color = "darkOrange";
        return;
    }

    if (!isNumericWithComma(positions)) {
        element.innerHTML = "Incorrect positions <br>";
        return;
    }

    sum1 = Number(sum1);
    sum2 = Number(sum2);

    if (sum1 < minValue || sum2 > maxValue || sum1 > sum2) {
        element.innerHTML = "Index can be -1000 to 1000 <br> and start index < end index <br>";
        return;
    }
    element.style.color = "black";

    //get positions in massive
    let positionArray = positions.split(",");

    for (let i = sum1; i <= sum2; i++) {
        if (contains(positionArray, i % 10)) {
            sum += i;
        }
    }
    element.innerHTML = sum + "";
}

function printStars() {
    let result = "";
    let stars = Number(document.getElementById("task_3_stars").value);
    let element = document.getElementById("stars_50");
    for (let i = 1; i <= stars; i++) {
        for(let j = 0; j < i; j++)
            result += "*";
        result += "<br/>";
    }
    element.innerHTML = result;
}

function getDateTime(second) {
    const secondsInHour = 3600;
    const secondsInMinutes = 60;
    const decimal = 10;
    let sec = second.value;
    let element = document.getElementById("full_time");

    let hour = Math.floor(sec / secondsInHour);
    sec -= secondsInHour * hour;
    let minutes = Math.floor(sec / secondsInMinutes);
    sec -= secondsInMinutes * minutes;

    if (hour < decimal)
        hour = "0" + hour;
    if (minutes < decimal)
        minutes = "0" + minutes;
    if (sec < decimal)
        sec = "0" + sec;

    element.innerHTML = hour + ":" + minutes + ":" + sec;
}

function printAge(years) {
    years = Number(years.value);
    let element = document.getElementById("age");
    let fraze = "лет";
    if (years < 1 || years > 110)
        fraze = "бред";
    if (years % 10 === 1)
        fraze = "год";
    if (years % 10 === 2 || years % 10 === 3 || years % 10 === 4)
        fraze = "года";
    if (years > 10 && years < 15)
        fraze = "лет";
    element.innerHTML = (years + " " + fraze);
}

function intervalDate(firstData, secondData) {

    firstData = firstData.value;
    secondData = secondData.value;
    let element = document.getElementById("interval");
    let intervalDate;

    element.innerHTML = (intervalDate);
}

function task_7(data) {
    
}

function task_8(chessBoardLength) {
    
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

