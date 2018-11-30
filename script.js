// https://jscompress.com/

// Check Chrome
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
    alert('Please be aware this site only officially supports Chrome on Desktop.\nFor best performance and reliability please use this site via Chrome.');
}

// Generate clock face
var clock = document.querySelector(".clock");
var rotate = 0;

var byFive = function (n) {
    return Boolean(n / 5 === parseInt(n / 5, 10));
};

for (i = 0; i < 30; i++) {
    var span = document.createElement("span");

    if (byFive(i)) {
        span.className = "fives";
    }

    span.style.transform = "translate(-50%,-50%) rotate(" + rotate + "deg)";
    clock.appendChild(span);
    rotate += 6;
}

// Set the clock position
(function setClock() {
    // Get times
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // Get elms
    var clock = {
        hours: document.querySelector('.hours'),
        minutes: document.querySelector('.minutes'),
        seconds: document.querySelector('.seconds')
    };

    // Work out hand rotations
    var deg = {
        hours: 30 * hours + .5 * minutes,
        minutes: 6 * minutes + .1 * seconds,
        seconds: 6 * seconds
    };

    // Apply rotations
    clock.hours.style.transform = 'rotate(' + deg.hours + 'deg)';
    clock.minutes.style.transform = 'rotate(' + deg.minutes + 'deg)';
    clock.seconds.style.transform = 'rotate(' + deg.seconds + 'deg)';

    // Generate date text
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var printDate = days[time.getDay()] + ' ' + time.getDate() + ' ' + months[time.getMonth()] + ' ' + time.getFullYear();

    // Generate time text
    var printTime = (time.getHours() < 10 ? '0' : '') + time.getHours();
    printTime += ':';
    printTime += (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    printTime += ':';
    printTime += (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();

    // Apply date/time text
    var output = document.querySelectorAll('output.date')[0];
    output.innerHTML = "<i>&nbsp;" + printDate + "&nbsp;</i><br/><b>&nbsp;" + printTime + "&nbsp;</b>";

    // Recurse
    setTimeout(setClock, 1000);
})();
