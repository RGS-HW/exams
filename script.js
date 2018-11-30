/**
 *  exams: The clock used and projected during examinations in the main hall.
 *  <https://github.com/rgshw/exams/>
 *  Copyright (C) 2018 Matt Cowley (MattIPv4) (me@mattcowley.co.uk)
 *
 *  This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *  You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, please see
 *   <https://github.com/rgshw/exams/blob/master/LICENSE> or <http://www.gnu.org/licenses/>.
 **/
/* https://jscompress.com/ */

// Check Chrome
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
    alert('Please be aware this site only officially supports Chrome on Desktop.\nFor best performance and reliability please use this site via Chrome.');
}

// Generate clock face
var clock = document.querySelector(".clock");

var byFive = function (n) {
    return Boolean(n / 5 === parseInt(n / 5, 10));
};

for (var i = 0; i < 30; i++) {
    var span = document.createElement("span");

    if (byFive(i)) {
        span.className = "fives";
    }

    span.style.transform = "translate(-50%,-50%) rotate(" + (i*6).toString() + "deg)";
    clock.appendChild(span);
}

for (var i = 2; i < 13; i++) {
    var li = document.querySelector("section.clock ul li:nth-child("+i.toString()+")");
    var lii = document.querySelector("section.clock ul li:nth-child("+i.toString()+") i");

    li.style.transform = "rotate("+(30*(i-1)).toString()+"deg)";
    lii.style.transform = "translateX(-50%) rotate(-"+(30*(i-1)).toString()+"deg)";
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
