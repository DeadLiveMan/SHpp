
function sum_1() {
    let sum = 0;
    let sum1 = document.getElementById("task_1_start").value;
    let sum2 = document.getElementById("task_1_end").value;

    // Check the numbers
    if (!isNumeric(sum1) || !isNumeric(sum2)) {
        document.getElementById("sum_1").innerHTML = "Wrong input <br>";
        document.getElementById("sum_1").style.color = "darkOrange";
        return;
    }
    const minValue = -1000;
    const maxValue = 1000;

    sum1 = Number(sum1);
    sum2 = Number(sum2);

    if (sum1 < minValue || sum2 > maxValue || sum1 > sum2) {
        document.getElementById("sum_1").innerHTML = "Index can be -1000 to 1000 <br> and start index <= end index <br>";
        document.getElementById("sum_1").style.color = "darkOrange";
        return;
    }

    for (let i = sum1; i <= sum2; i++) {
        sum += i;
    }
    document.getElementById("sum_1").style.color = "black";
    document.getElementById("sum_1").innerHTML = sum + "<br>";
}

function sum_2() {
    let sum = 0;
    let sum1 = Number(document.getElementById("task_2_start").value);
    let sum2 = Number(document.getElementById("task_2_end").value);
    let positions = document.getElementById("positions").value;

    if (!isNumericWithComma(positions)) {
        document.getElementById("sum_2").innerHTML = "Incorrect positions <br>";
        document.getElementById("sum_2").style.color = "darkOrange";
    }

    const minValue = -1000;
    const maxValue = 1000;

    sum1 = Number(sum1);
    sum2 = Number(sum2);

    if (sum1 < minValue || sum2 > maxValue || sum1 > sum2) {
        document.getElementById("sum_1").innerHTML = "Index can be -1000 to 1000 <br> and start index < end index <br>";
        document.getElementById("sum_1").style.color = "darkOrange";
        return;
    }

    //get positions in massive
    let positionArray = positions.split(",");

    for (let i = sum1; i <= sum2; i++) {
        if (contains(positionArray, i % 10)) {
            sum += i;
        }
    }
    document.getElementById("sum_2").innerHTML = sum + "";
}

function stars_50() {
    let result = "";
    let stars = Number(document.getElementById("task_3_stars").value);
    for (let i = 1; i <= stars; i++) {
        for(let j = 0; j < i; j++) {
            result += "*";
        }
        result += "<br/>";
    }
    document.getElementById("stars_50").innerHTML = result;
}

function getFullTime(second) {
    const secondsInHour = 3600;
    const secondsInMinutes = 60;
    const decimal = 10;
    let sec = second.value;

    let hour = 0;
    let minutes = 0;

    while (sec >= secondsInHour) {
        hour++;
        sec -= secondsInHour;
    }

    while (sec >= secondsInMinutes) {
        minutes++;
        sec -= secondsInMinutes;
    }

    if (hour < decimal)
        hour = "0" + hour;
    if (minutes < decimal)
        minutes = "0" + minutes;
    if (sec < decimal)
        sec = "0" + sec;

    document.getElementById("full_time").innerHTML = "Result: " + (hour + ":" + minutes + ":" + sec);
}

function task_5(years) {
    let fraze = "лет";
    if (years < 1)
        fraze = "бред";
    if (years % 10 === 1)
        fraze = "год";
    if (years % 10 === 2 || years % 10 === 3 || years % 10 === 4)
        fraze = "года";
    if (years > 10 && years < 15)
        fraze = "лет";
    document.write(years + " " + fraze);
}

function task_6(firstData, secondData) {

}

function task_7(data) {
    
}

function task_8(chessBoardLength) {
    
}

function task_9(roomNumber, stages, entrance, roomsInStage) {
    let roomsInEntrance = stages * roomsInStage;
    let currentEntrance = 1;
    let currentStage = 1;
    while (roomsInEntrance < roomNumber) {
        currentEntrance++;
        roomNumber -= roomsInEntrance;
    }
    while (roomsInStage < roomNumber) {
        currentStage++;
        roomNumber -= roomsInStage;
    }
    document.write("Entrance = " + currentEntrance + " stage = " + currentStage )
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

