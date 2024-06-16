function _typeof(e) {
	return (_typeof =
		'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
			? function (e) {
					return typeof e;
			  }
			: function (e) {
					return e &&
						'function' == typeof Symbol &&
						e.constructor === Symbol &&
						e !== Symbol.prototype
						? 'symbol'
						: typeof e;
			  })(e);
}
function _readOnlyError(e) {
	throw new TypeError('"' + e + '" is read-only');
}
function _defineProperties(e, t) {
	for (var r = 0; r < t.length; r++) {
		var n = t[r];
		(n.enumerable = n.enumerable || !1),
			(n.configurable = !0),
			'value' in n && (n.writable = !0),
			Object.defineProperty(e, _toPropertyKey(n.key), n);
	}
}
function _createClass(e, t, r) {
	return (
		t && _defineProperties(e.prototype, t),
		r && _defineProperties(e, r),
		Object.defineProperty(e, 'prototype', { writable: !1 }),
		e
	);
}
function _toPropertyKey(e) {
	e = _toPrimitive(e, 'string');
	return 'symbol' == _typeof(e) ? e : e + '';
}
function _toPrimitive(e, t) {
	if ('object' != _typeof(e) || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (void 0 === r) return ('string' === t ? String : Number)(e);
	r = r.call(e, t || 'default');
	if ('object' != _typeof(r)) return r;
	throw new TypeError('@@toPrimitive must return a primitive value.');
}
function _classCallCheck(e, t) {
	if (!(e instanceof t))
		throw new TypeError('Cannot call a class as a function');
}
var tardis = (function (theTime, pattern) {
	var patterns = [
			'YYYY',
			'YYY',
			'YY',
			'y',
			'MMMM',
			'MMM',
			'MM',
			'M',
			'm',
			'DDDD',
			'DDD',
			'DD',
			'D',
			'd',
			'HHHH',
			'HH',
			'H',
			'h',
			'IIII',
			'II',
			'I',
			'i',
			'SSSS',
			'SS',
			'S',
			's',
			'TT',
			'tt',
		],
		keys = [
			'fullYear',
			'wordYear',
			'YYear',
			'year',
			'fullMonth',
			'shortMonth',
			'MMonth',
			'month',
			'monthInt',
			'fullDay',
			'shortDay',
			'DDay',
			'day',
			'dayInt',
			'wordHour',
			'HHour',
			'hour',
			'hourInt',
			'wordMin',
			'MMin',
			'min',
			'minInt',
			'wordSec',
			'SSec',
			'sec',
			'secInt',
			'TT',
			'tt',
		],
		days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		months = [
			'January',
			'Febuary',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		a = [
			'',
			'one ',
			'two ',
			'three ',
			'four ',
			'five ',
			'six ',
			'seven ',
			'eight ',
			'nine ',
			'ten ',
			'eleven ',
			'twelve ',
			'thirteen ',
			'fourteen ',
			'fifteen ',
			'sixteen ',
			'seventeen ',
			'eighteen ',
			'nineteen ',
		],
		b = [
			'',
			'',
			'twenty',
			'thirty',
			'forty',
			'fifty',
			'sixty',
			'seventy',
			'eighty',
			'ninety',
		],
		convertTime = function (e) {
			var t;
			return (
				(e = checkUnixTime(e)),
				isNaN(e)
					? 'ERROR: Invalid time format: ' + e
					: (((e = {
							year: (t = new Date(1e3 * e)).getYear(),
							month: t.getMonth() + 1,
							day: t.getDate(),
							hour: t.getHours(),
							min: ('0' + t.getMinutes()).slice(-2),
							sec: ('0' + t.getSeconds()).slice(-2),
							fullYear: t.getFullYear(),
							shortYear: t.getYear().toString().substr(-2),
							wordYear: inWords(t.getFullYear()).trim(),
							fullMonth: months[t.getMonth()],
							shortMonth: months[t.getMonth()].substr(0, 3),
							fullDay: days[t.getDay()],
							shortDay: days[t.getDay()].substr(0, 3),
							wordHour: inWords(t.getHours()).trim(),
							wordMin: inWords(t.getMinutes()).trim(),
							wordSec: inWords(t.getSeconds()).trim(),
							yearInt: t.getYear(),
							monthInt: t.getMonth(),
							dayInt: t.getDay(),
							hourInt: t.getHours(),
							minInt: t.getMinutes(),
							secInt: t.getSeconds(),
							YYear: t.getYear().toString().substr(-2),
							MMonth: ('0' + (t.getMonth() + 1)).slice(-2),
							DDay: ('0' + (t.getDate() + 1)).slice(-2),
							HHour: ('0' + t.getHours()).slice(-2),
							MMin: ('0' + t.getMinutes()).slice(-2),
							SSec: ('0' + t.getSeconds()).slice(-2),
							TT: null,
							tt: null,
							utc: t,
							timestamp: e,
					  }).TT = t.hour < 11 ? 'AM' : 'PM'),
					  (e.tt = t.hour < 11 ? 'am' : 'pm'),
					  e)
			);
		},
		checkUnixTime = function (e) {
			e = '' != e && null != e ? e : Math.floor(Date.now() / 1e3);
			return (e = isNaN(Date.parse(e))
				? e
				: e
						.split(' - ')
						.map(function (e) {
							return Date.parse(e + '-0500') / 1e3;
						})
						.join(' - '));
		},
		inWords = function (e) {
			var t;
			return 9 < (e = e.toString()).length
				? 'overflow'
				: (e = ('000000000' + e)
						.substr(-9)
						.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/))
				? ((t = ''),
				  (t =
						(t =
							(t =
								(t +=
									0 != e[1]
										? (a[Number(e[1])] ||
												b[e[1][0]] + ' ' + a[e[1][1]]) +
										  'crore '
										: '') +
								(0 != e[2]
									? (a[Number(e[2])] ||
											b[e[2][0]] + ' ' + a[e[2][1]]) +
									  'lakh '
									: '')) +
							(0 != e[3]
								? (a[Number(e[3])] ||
										b[e[3][0]] + ' ' + a[e[3][1]]) +
								  'thousand '
								: '')) +
						(0 != e[4]
							? (a[Number(e[4])] ||
									b[e[4][0]] + ' ' + a[e[4][1]]) + 'hundred '
							: '')) +
						(0 != e[5]
							? (t ? 'and ' : '') +
							  (a[Number(e[5])] || b[e[5][0]] + ' ' + a[e[5][1]])
							: ''))
				: void 0;
		},
		replaceAll = function (e, t, r) {
			t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			t = new RegExp(t, 'g');
			return e.replace(t, r);
		},
		workTweleve = function (e) {
			return 12 < e ? (e -= 12) : 0 == e && (e = '12'), e;
		},
		dateparts = function (e) {
			return convertTime(e);
		},
		replacement = _createClass(function e() {
			var t =
					0 < arguments.length && void 0 !== arguments[0]
						? arguments[0]
						: '',
				r =
					1 < arguments.length && void 0 !== arguments[1]
						? arguments[1]
						: '';
			_classCallCheck(this, e), (this.key = t), (this.val = r);
		}),
		patterned = function patterned(theTime, pattern) {
			var thisDate = convertTime(theTime),
				replaceStr = '',
				replaceMap = [];
			patterns.forEach(function (val, index) {
				var thisEdit = '';
				(replaceStr = '{{' + index + '}}'),
					(thisEdit = new replacement(
						replaceStr,
						eval('thisDate.' + keys[index])
					)),
					replaceMap.push(thisEdit),
					(pattern = replaceAll(pattern, val, replaceStr));
			});
			for (var i = 0; i < replaceMap.length; i++) {
				var rpl = replaceMap[i];
				pattern = replaceAll(pattern, rpl.key, rpl.val);
			}
			return { pattern: pattern, time: theTime };
		},
		ISO = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullYear,
					e.MMonth,
					e.day,
					_readOnlyError('formattedDate')),
				t
			);
		},
		ShortDate = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.MMonth,
					e.day,
					e.fullYear,
					_readOnlyError('formattedDate')),
				t
			);
		},
		LongDate = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.shortMonth,
					e.day,
					e.fullYear,
					_readOnlyError('formattedDate')),
				t
			);
		},
		MonthDate = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullMonth,
					e.day,
					e.fullYear,
					_readOnlyError('formattedDate')),
				t
			);
		},
		MonthDateTime = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullMonth,
					e.day,
					e.fullYear,
					e.hour,
					e.min,
					_readOnlyError('formattedDate')),
				t
			);
		},
		MonthDateTime12 = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullMonth,
					e.day,
					e.fullYear,
					workTweleve(e.hour),
					e.min,
					e.TT,
					_readOnlyError('formattedDate')),
				t
			);
		},
		DayMonthDate = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullDay,
					e.fullMonth,
					e.day,
					e.fullYear,
					_readOnlyError('formattedDate')),
				t
			);
		},
		Year = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullYear, _readOnlyError('formattedDate')),
				t
			);
		},
		Month = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullMonth, _readOnlyError('formattedDate')),
				t
			);
		},
		Day = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.fullDay, _readOnlyError('formattedDate')),
				t
			);
		},
		TimeOfDay = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(e.hour, e.min, e.SSec, _readOnlyError('formattedDate')),
				t
			);
		},
		TimeOfDay12 = function (e) {
			var e = convertTime(e),
				t = e;
			return (
				'object' == _typeof(e) &&
					(workTweleve(e.hour),
					e.min,
					e.SSec,
					e.TT,
					_readOnlyError('formattedDate')),
				t
			);
		},
		doctorwho = function () {
			console.log('Spoilers!');
			var e = [
				'Bowties are cool.',
				'Rule 1, the Doctor lies.',
				'I’m a mad man with a box.',
				'Run!',
				'and Don’t Blink!',
				'Fezzes are cool.',
				'Never cruel or cowardly. Never give up, never give in.',
				'Do what I do. Hold tight and pretend it’s a plan!',
				'Rest is for the weary, sleep is for the dead',
				'We’re all stories, in the end. Just make it a good one, eh?',
				'Good men don’t need rules',
				'Never run when you’re scared.',
				'What’s the point in two hearts if you can’t be a bit forgiving now and then?',
				'There’s no point in being grown up if you can’t be childish sometimes.',
				'You want weapons? We’re in a library! Books! The best weapons in the world!',
				'A straight line may be the shortest distance between two points, but it is by no means the most interesting',
				'Come on, Rory! It isn’t rocket science, it’s just quantum physics!',
				'Big flashy things have my name written all over them. Well… not yet, give me time and a crayon.',
				'In 900 years of time and space, I’ve never met anyone who wasn’t important',
				'Almost every species in the universe has an irrational fear of the dark. But they’re wrong. ‘Cause it’s not irrational.',
				'Biting’s excellent. It’s like kissing – only there is a winner.',
				'Never be certain of anything. It’s a sign of weakness.',
				'Spoilers!',
				'Geronimo',
				'Hello Sweetie',
				'Allons-y',
			];
			return e[Math.floor(Math.random() * e.length)];
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
		doctorwho: doctorwho,
	};
})();
console.log(tardis.dateparts()), console.log(tardis.dateparts('apple sauce'));
