/* 
Tardis - a module for dates and time formating and converting.
version: v1.3.0
Updated: June 29, 2019
Author: Mike McAllister
Email: mike@logikbox.com
Site: https://logikbox.com
Date: June 28, 2019
Docs: https: //docs.google.com/spreadsheets/d/1SVNrBFcKqkojN59xQNyeA3mvNxvX8pwgXzKj9JABAtw/edit?usp=sharing


usage: include the file in your build.  
public methods:
    taris.dateparts({date}); -- simple date part object
    taris.MonthDateTime({date}); -- preformatted displays
    taris.DayMonthDate({date}); -- preformatted displays 
*/


module.exports = function (theTime, pattern) {
        // Keep this variables private inside this closure scope

        // Patterns and Keys must stay in sync vlaue and size wise,
        const patterns = ["YYYY", "YYY", "YY", "y", "MMMM", "MMM", "MM", "M", "m", "DDDD", "DDD", "DD", "D", "d", "HHHH", "HH", "H", "h", "IIII", "II", "I", "i", "SSSS", "SS", "S", "s", "TT", "tt"];
        const keys = ["fullYear", "wordYear", "YYear", "year", "fullMonth", "shortMonth", "MMonth", "month", "monthInt", "fullDay", "shortDay", "DDay", "day", "dayInt", "wordHour", "HHour", "hour", "hourInt", "wordMin", "MMin", "min", "minInt", "wordSec", "SSec", "sec", "secInt", "TT", "tt"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
        const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];


        // Private Methods ----------------------------------------------------------------------------------------------- //

        function convertTime(theTime) {
            theTime = checkUnixTime(theTime);
            let date = new Date(theTime * 1000);
            let dateObj = {
                year: date.getYear(),
                month: (date.getMonth() + 1),
                day: date.getDate(),
                hour: date.getHours(),
                min: ("0" + date.getMinutes()).slice(-2),
                sec: ("0" + date.getSeconds()).slice(-2),

                fullYear: date.getFullYear(),
                shortYear: date.getYear().toString().substr(-2),
                wordYear: inWords(date.getFullYear()).trim(),
                fullMonth: months[date.getMonth()],
                shortMonth: months[date.getMonth()].substr(0, 3),
                fullDay: days[date.getDay()],
                shortDay: days[date.getDay()].substr(0, 3),
                wordHour: inWords(date.getHours()).trim(),
                wordMin: inWords(date.getMinutes()).trim(),
                wordSec: inWords(date.getSeconds()).trim(),

                yearInt: date.getYear(),
                monthInt: date.getMonth(),
                dayInt: date.getDay(),
                hourInt: date.getHours(),
                minInt: date.getMinutes(),
                secInt: date.getSeconds(),

                YYear: date.getYear().toString().substr(-2),
                MMonth: ("0" + (date.getMonth() + 1)).slice(-2),
                DDay: ("0" + (date.getDate() + 1)).slice(-2),
                HHour: ("0" + date.getHours()).slice(-2),
                MMin: ("0" + date.getMinutes()).slice(-2),
                SSec: ("0" + date.getSeconds()).slice(-2),
                TT: null,
                tt: null,

                utc: date,
                timestamp: theTime
            };

            dateObj.TT = (date.hour < 11) ? "AM" : "PM";
            dateObj.tt = (date.hour < 11) ? "am" : "pm";

            return dateObj;
        }

        function checkUnixTime(theTime) {
            if (theTime == '' || theTime == undefined) theTime = Math.floor(Date.now() / 1000);
            let checkedTime = theTime;

            if (!isNaN(Date.parse(checkedTime))) {
                checkedTime = checkedTime.split(" - ").map(function (date) {
                    return Date.parse(date + "-0500") / 1000;
                }).join(" - ");
            }

            return checkedTime;
        }

        // https://github.com/salmanm/num-words
        function inWords(num) {
            if ((num = num.toString()).length > 9) return 'overflow';
            let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return;
            var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
            return str;
        }

        function replaceAll(str, replaceWhat, replaceTo) {
            //console.log("replaceAll", str, replaceWhat, replaceTo);
            replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp(replaceWhat, 'g');
            return str.replace(re, replaceTo);
        }


        let workTweleve = theHour => {
            let hours = theHour;
            if (hours > 12) {
                hours = (hours - 12);
            } else if (hours == 0) {
                hours = "12";
            }

            return hours;
        };

        // Public Methods ----------------------------------------------------------------------------------------------- //


        let dateparts = theTime => {
            return convertTime(theTime);
        };

        class replacement {
            constructor(key = '', val = '') {
                this.key = key;
                this.val = val;
            }
        }

        // Freeform patterns
        let patterned = (theTime, pattern) => {
            let thisDate = convertTime(theTime);
            let replaceStr = '';
            let replaceMap = [];


            patterns.forEach(function (val, index) {
                let thisEdit = '';
                replaceStr = '{{' + index + '}}';
                thisEdit = new replacement(replaceStr, eval('thisDate.' + keys[index]));
                replaceMap.push(thisEdit);
                pattern = replaceAll(pattern, val, replaceStr);
            });

            for (var i = 0; i < replaceMap.length; i++) {
                let rpl = replaceMap[i];
                pattern = replaceAll(pattern, rpl.key, rpl.val);
            }

            return {
                pattern: pattern,
                time: theTime
            };
        };

        // Preset patterns
        let ISO = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullYear + "-" + thisDate.MMonth + "-" + thisDate.day;

            return formattedDate;
        };

        let ShortDate = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.MMonth + "/" + thisDate.day + "/" + thisDate.fullYear;

            return formattedDate;
        };

        let LongDate = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.shortMonth + ' ' + thisDate.day + ' ' + thisDate.fullYear;

            return formattedDate;
        };

        let MonthDate = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullMonth + ' ' + thisDate.day + ', ' + thisDate.fullYear;

            return formattedDate;
        };

        let MonthDateTime = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullMonth + ' ' + thisDate.day + ', ' + thisDate.fullYear + ' ' + thisDate.hour + ':' + thisDate.min;

            return formattedDate;
        };

        let MonthDateTime12 = theTime => {
            let thisDate = convertTime(theTime);

            let formattedDate = thisDate.fullMonth + ' ' + thisDate.day + ', ' + thisDate.fullYear + ' ' + workTweleve(thisDate.hour) + ':' + thisDate.min + ' ' + thisDate.TT;

            return formattedDate;
        };

        let DayMonthDate = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullDay + ', ' + thisDate.fullMonth + ' ' + thisDate.day + ', ' + thisDate.fullYear;

            return formattedDate;
        };

        let Year = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullYear;

            return formattedDate;
        };

        let Month = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullMonth;

            return formattedDate;
        };

        let Day = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.fullDay;

            return formattedDate;
        };

        let TimeOfDay = theTime => {
            let thisDate = convertTime(theTime);
            let formattedDate = thisDate.hour + ':' + thisDate.min + ':' + thisDate.SSec;

            return formattedDate;
        };

        let TimeOfDay12 = theTime => {
            let thisDate = convertTime(theTime);

            let formattedDate = workTweleve(thisDate.hour) + ':' + thisDate.min + ':' + thisDate.SSec + " " + thisDate.TT;

            return formattedDate;
        };

        // Nerd stuff
        let doctorwho = function () {
            console.log('Spoilers!');
            let quotes = ['Bowties are cool.', 'Rule 1, the Doctor lies.', 'I’m a mad man with a box.', 'Run!', 'and Don’t Blink!', 'Fezzes are cool.', 'Never cruel or cowardly. Never give up, never give in.', 'Do what I do. Hold tight and pretend it’s a plan!', 'Rest is for the weary, sleep is for the dead', 'We’re all stories, in the end. Just make it a good one, eh?', 'Good men don’t need rules', 'Never run when you’re scared.', 'What’s the point in two hearts if you can’t be a bit forgiving now and then?', 'There’s no point in being grown up if you can’t be childish sometimes.', 'You want weapons? We’re in a library! Books! The best weapons in the world!', 'A straight line may be the shortest distance between two points, but it is by no means the most interesting', 'Come on, Rory! It isn’t rocket science, it’s just quantum physics!', 'Big flashy things have my name written all over them. Well… not yet, give me time and a crayon.', 'In 900 years of time and space, I’ve never met anyone who wasn’t important', 'Almost every species in the universe has an irrational fear of the dark. But they’re wrong. ‘Cause it’s not irrational.', 'Biting’s excellent. It’s like kissing – only there is a winner.', 'Never be certain of anything. It’s a sign of weakness.', 'Spoilers!', 'Geronimo', 'Hello Sweetie'];

            return quotes[Math.floor(Math.random() * quotes.length)];
        };

        return {
            dateparts: dateparts,
            patterned: patterned,
            ISO: ISO,
            ShortDate: ShortDate,
            LongDate: LongDate,
            MonthDate: MonthDate,
            MonthDateTime: MonthDateTime,
            MonthDateTime12: MonthDateTime12,
            DayMonthDate: DayMonthDate,
            Year: Year,
            Month: Month,
            Day: Day,
            TimeOfDay: TimeOfDay,
            TimeOfDay12: TimeOfDay12,
            doctorwho: doctorwho
        };


}();


  