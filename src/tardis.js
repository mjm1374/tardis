/* 
Tardis - a module for dates and time formating and converting.
version: v1.0
Updated: June 28, 2019
Author: Mike McAllister
Email: mike@logikbox.com
Site: https://logikbox.com
Date: June 28, 2019


usage: include the file in your build.  
public methods:
    taris.dateparts({date}); -- simple date part object
    taris.MonthDateTime({date}); -- preformatted displays
    taris.DayMonthDate({date}); -- preformatted displays
*/


let tardis = (function (theTime) {
    // Keep this variables private inside this closure scope
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];

    function convertTime(theTime) {
        theTime = checkUnixTime(theTime);
        let date = new Date(theTime * 1000);
        let dateObj = {
            year: date.getYear(),
            day: date.getDate(),
            month: (date.getMonth() + 1),
            hour: date.getHours(),
            min: ("0" + date.getMinutes()).slice(-2),
            sec: ("0" + date.getSeconds()).slice(-2),
            fullYear: date.getFullYear(),
            dayofweek: days[date.getDay()],
            dayInt: date.getDay(),
            fullMonth: months[date.getMonth()],
            monthInt: date.getMonth(),
            utc: date,
            timestamp: theTime
        };
        return dateObj;
    }

    function checkUnixTime(theTime) {
        if (theTime == '' || theTime == undefined) theTime = Math.floor(Date.now() / 1000);
        //console.log(theTime);
        let checkedTime = theTime;

        if (!isNaN(Date.parse(checkedTime))) {
            checkedTime = checkedTime.split(" - ").map(function (date) {
                return Date.parse(date + "-0500") / 1000;
            }).join(" - ");
        }

        return checkedTime;
    }

    let dateparts = theTime => {
        return convertTime(theTime);
    };

    let MonthDateTime = theTime => {
        let thisDate = convertTime(theTime);
        let formatteDate = thisDate.fullMonth + ' ' + thisDate.day + ', ' + thisDate.fullYear + ' ' + thisDate.hour + ':' + thisDate.min;

        return formatteDate;
    };

    let DayMonthDate = theTime => {
        let thisDate = convertTime(theTime);
        let formatteDate = thisDate.dayofweek + ",  " + thisDate.fullMonth + " " + thisDate.day + "." + thisDate.fullYear;

        return formatteDate;
    };

    let doctorwho = function () {
        console.log('Spoilers!');
        let quotes = ['Bowties are cool.', 'Rule 1, the Doctor lies.', 'I’m a mad man with a box.', 'Run!', 'and Don’t Blink!', 'Fezzes are cool.', 'Never cruel or cowardly. Never give up, never give in.', 'Do what I do. Hold tight and pretend it’s a plan!', 'Rest is for the weary, sleep is for the dead', 'We’re all stories, in the end. Just make it a good one, eh?', 'Good men don’t need rules', 'Never run when you’re scared.', 'What’s the point in two hearts if you can’t be a bit forgiving now and then?', 'There’s no point in being grown up if you can’t be childish sometimes.', 'You want weapons? We’re in a library! Books! The best weapons in the world!', 'A straight line may be the shortest distance between two points, but it is by no means the most interesting', 'Come on, Rory! It isn’t rocket science, it’s just quantum physics!', 'Big flashy things have my name written all over them. Well… not yet, give me time and a crayon.', 'In 900 years of time and space, I’ve never met anyone who wasn’t important', 'Almost every species in the universe has an irrational fear of the dark. But they’re wrong. ‘Cause it’s not irrational.', 'Biting’s excellent. It’s like kissing – only there is a winner.', 'Never be certain of anything. It’s a sign of weakness.', 'Spoilers!', 'Geronimo', 'Hello Sweetie'];

        return quotes[Math.floor(Math.random() * quotes.length)];
    };

    return {
        dateparts: dateparts,
        MonthDateTime: MonthDateTime,
        DayMonthDate: DayMonthDate,
        doctorwho: doctorwho
    };

}());


// console.log(tardis.dateparts());
// console.log(tardis.doctorwho());
// console.log(tardis.DayMonthDate());
// console.log(tardis.MonthDateTime());
// console.log('-------------------------------------');
// console.log(tardis.dateparts(-21764880));
// console.log(tardis.DayMonthDate(-21764880));
// console.log(tardis.MonthDateTime(-21764880));