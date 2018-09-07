
function task_1() {
    let sum = 0;
    for (let i = -1000; i <= 1000; i++) {
        sum += i;
    }
    document.write("sum = " + sum);
}

function task_2() {
    let sum = 0;
    for (let i = -1000; i <= 1000; i++) {
        if (i % 10 === 2 || i % 10 === 3 || i % 10 === 7) {
            sum += i;
        }
    }
    document.write("sum = " + sum);
}

function task_3() {
    let result;
    for (let i = 1; i <= 50; i++) {
        for(let j = 0; j < i; j++) {
            result += "*";
        }
        result += "<br/>";
    }
    return result;
}

function task_4(second) {
    const secondsInHour = 3600;
    const secondsInMinutes = 60;
    const decimal = 10;

    let hour = 0;
    let minutes = 0;

    while (second >= secondsInHour) {
        hour++;
        second -= secondsInHour;
    }

    while (second >= secondsInMinutes) {
        minutes++;
        second -= secondsInMinutes;
    }

    if (hour < decimal)
        hour = "0" + hour;
    if (minutes < decimal)
        minutes = "0" + minutes;
    if (second < decimal)
        second = "0" + second;

    document.write(hour + ":" + minutes + ":" + second);
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
    document.write(sum);
}

function task_11() {

}

function test() {
    for (let i = 0; i < 100; i++) {
        task_5(i);
        document.write("<br/>")
    }
}

