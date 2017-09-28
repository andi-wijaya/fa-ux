$.extend({
  date:function(format, timestamp){

    var that = this;
    var jsdate, f;
    // Keep this here (works, but for code commented-out below for file size reasons)
    // var tal= [];
    var txt_words = [
      'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // trailing backslash -> (dropped)
    // a backslash followed by any character (including backslash) -> the character
    // empty string -> empty string
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function(t, s) {
      return f[t] ? f[t]() : s;
    };
    var _pad = function(n, c) {
      n = String(n);
      while (n.length < c) {
        n = '0' + n;
      }
      return n;
    };
    f = {
      // Day
      d: function() { // Day of month w/leading 0; 01..31
        return _pad(f.j(), 2);
      },
      D: function() { // Shorthand day name; Mon...Sun
        return f.l()
          .slice(0, 3);
      },
      j: function() { // Day of month; 1..31
        return jsdate.getDate();
      },
      l: function() { // Full day name; Monday...Sunday
        return txt_words[f.w()] + 'day';
      },
      N: function() { // ISO-8601 day of week; 1[Mon]..7[Sun]
        return f.w() || 7;
      },
      S: function() { // Ordinal suffix for day of month; st, nd, rd, th
        var j = f.j();
        var i = j % 10;
        if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
          i = 0;
        }
        return ['st', 'nd', 'rd'][i - 1] || 'th';
      },
      w: function() { // Day of week; 0[Sun]..6[Sat]
        return jsdate.getDay();
      },
      z: function() { // Day of year; 0..365
        var a = new Date(f.Y(), f.n() - 1, f.j());
        var b = new Date(f.Y(), 0, 1);
        return Math.round((a - b) / 864e5);
      },

      // Week
      W: function() { // ISO-8601 week number
        var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
        var b = new Date(a.getFullYear(), 0, 4);
        return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
      },

      // Month
      F: function() { // Full month name; January...December
        return txt_words[6 + f.n()];
      },
      m: function() { // Month w/leading 0; 01...12
        return _pad(f.n(), 2);
      },
      M: function() { // Shorthand month name; Jan...Dec
        return f.F()
          .slice(0, 3);
      },
      n: function() { // Month; 1...12
        return jsdate.getMonth() + 1;
      },
      t: function() { // Days in month; 28...31
        return (new Date(f.Y(), f.n(), 0))
          .getDate();
      },

      // Year
      L: function() { // Is leap year?; 0 or 1
        var j = f.Y();
        return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
      },
      o: function() { // ISO-8601 year
        var n = f.n();
        var W = f.W();
        var Y = f.Y();
        return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
      },
      Y: function() { // Full year; e.g. 1980...2010
        return jsdate.getFullYear();
      },
      y: function() { // Last two digits of year; 00...99
        return f.Y()
          .toString()
          .slice(-2);
      },

      // Time
      a: function() { // am or pm
        return jsdate.getHours() > 11 ? 'pm' : 'am';
      },
      A: function() { // AM or PM
        return f.a()
          .toUpperCase();
      },
      B: function() { // Swatch Internet time; 000..999
        var H = jsdate.getUTCHours() * 36e2;
        // Hours
        var i = jsdate.getUTCMinutes() * 60;
        // Minutes
        var s = jsdate.getUTCSeconds(); // Seconds
        return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
      },
      g: function() { // 12-Hours; 1..12
        return f.G() % 12 || 12;
      },
      G: function() { // 24-Hours; 0..23
        return jsdate.getHours();
      },
      h: function() { // 12-Hours w/leading 0; 01..12
        return _pad(f.g(), 2);
      },
      H: function() { // 24-Hours w/leading 0; 00..23
        return _pad(f.G(), 2);
      },
      i: function() { // Minutes w/leading 0; 00..59
        return _pad(jsdate.getMinutes(), 2);
      },
      s: function() { // Seconds w/leading 0; 00..59
        return _pad(jsdate.getSeconds(), 2);
      },
      u: function() { // Microseconds; 000000-999000
        return _pad(jsdate.getMilliseconds() * 1000, 6);
      },

      // Timezone
      e: function() { // Timezone identifier; e.g. Atlantic/Azores, ...
        // The following works, but requires inclusion of the very large
        // timezone_abbreviations_list() function.
        /*              return that.date_default_timezone_get();
         */
        throw 'Not supported (see source code of date() for timezone on how to add support)';
      },
      I: function() { // DST observed?; 0 or 1
        // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
        // If they are not equal, then DST is observed.
        var a = new Date(f.Y(), 0);
        // Jan 1
        var c = Date.UTC(f.Y(), 0);
        // Jan 1 UTC
        var b = new Date(f.Y(), 6);
        // Jul 1
        var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
        return ((a - c) !== (b - d)) ? 1 : 0;
      },
      O: function() { // Difference to GMT in hour format; e.g. +0200
        var tzo = jsdate.getTimezoneOffset();
        var a = Math.abs(tzo);
        return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
      },
      P: function() { // Difference to GMT w/colon; e.g. +02:00
        var O = f.O();
        return (O.substr(0, 3) + ':' + O.substr(3, 2));
      },
      T: function() { // Timezone abbreviation; e.g. EST, MDT, ...
        // The following works, but requires inclusion of the very
        // large timezone_abbreviations_list() function.
        /*              var abbr, i, os, _default;
         if (!tal.length) {
         tal = that.timezone_abbreviations_list();
         }
         if (that.php_js && that.php_js.default_timezone) {
         _default = that.php_js.default_timezone;
         for (abbr in tal) {
         for (i = 0; i < tal[abbr].length; i++) {
         if (tal[abbr][i].timezone_id === _default) {
         return abbr.toUpperCase();
         }
         }
         }
         }
         for (abbr in tal) {
         for (i = 0; i < tal[abbr].length; i++) {
         os = -jsdate.getTimezoneOffset() * 60;
         if (tal[abbr][i].offset === os) {
         return abbr.toUpperCase();
         }
         }
         }
         */
        return 'UTC';
      },
      Z: function() { // Timezone offset in seconds (-43200...50400)
        return -jsdate.getTimezoneOffset() * 60;
      },

      // Full Date/Time
      c: function() { // ISO-8601 date.
        return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
      },
      r: function() { // RFC 2822
        return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
      },
      U: function() { // Seconds since UNIX epoch
        return jsdate / 1000 | 0;
      }
    };
    this.date = function(format, timestamp) {
      that = this;
      jsdate = (timestamp === undefined ? new Date() : // Not provided
          (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
            new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
      );
      return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);

  },
  uniqid:function(){

    if(typeof $.__UNIQID == 'undefined') $.__UNIQID = 0;
    return ++$.__UNIQID;

  },

  val:function(key, obj, options){

    if(typeof options == 'undefined' || $.type(options) != 'object') options = {};

    var value = null;
    var default_value = typeof options['default_value'] != 'undefined' ? options['default_value'] : (typeof options['d'] != 'undefined' ? options['d'] : null)
    var datatype = typeof options['t'] != 'undefined' ? options['t'] : (typeof options['datatype'] != 'undefined' ? options['datatype'] : 'string');
    var required = typeof options['required'] != 'undefined' && required == 1 ? true : false;

    if($.type(obj) == 'object'){

      if($.type(key) == 'array'){

        value = null;
        for(var i = 0 ; i < key.length ; i++){

          var k = key[i];
          v = $.val(k, obj, { default_value:null });
          if(v != null){
            value = v;
            break;
          }

        }

      }
      else if($.type(key) == 'string' || $.type(key) == 'number'){

        if(typeof obj[key] != 'undefined')
          value = obj[key];

      }

    }
    else if($.type(obj) == 'array'){

      if(typeof obj[key] != 'undefined')
        value = obj[key];

    }

    if(required){

      if(value == null){

      }

    }
    else{

      value = value == null && default_value != null ? default_value : value;

    }

    switch(datatype){

      case 'number':
      case 'integer':
      case 'float':
      case 'double':
        value = parseFloat(value);
        break;

    }


    return value;

  },

  strtotime:function(text, now) {
    //  discuss at: http://phpjs.org/functions/strtotime/
    //     version: 1109.2016
    // original by: Caio Ariede (http://caioariede.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Caio Ariede (http://caioariede.com)
    // improved by: A. Matías Quezada (http://amatiasq.com)
    // improved by: preuter
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Mirko Faber
    //    input by: David
    // bugfixed by: Wagner B. Soares
    // bugfixed by: Artur Tchernychev
    //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    //   example 1: strtotime('+1 day', 1129633200);
    //   returns 1: 1129719600
    //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    //   returns 2: 1130425202
    //   example 3: strtotime('last month', 1129633200);
    //   returns 3: 1127041200
    //   example 4: strtotime('2009-05-04 08:30:00 GMT');
    //   returns 4: 1241425800

    var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

    if (!text) {
      return fail;
    }


    // Accept YYYYMMDD format
    if(/^\d{8}$/.test(text)){
      text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2);
    }

    // Unecessary spaces
    text = text.replace(/^\s+|\s+$/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\t\r\n]/g, '')
      .toLowerCase();

    // in contrast to php, js Date.parse function interprets:
    // dates given as yyyy-mm-dd as in timezone: UTC,
    // dates with "." or "-" as MDY instead of DMY
    // dates with two-digit years differently
    // etc...etc...
    // ...therefore we manually parse lots of common date formats
    match = text.match(
      /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

    if (match && match[2] === match[4]) {
      if (match[1] > 1901) {
        switch (match[2]) {
          case '-':
          { // YYYY-M-D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // YYYY.M.D is not parsed by strtotime()
            return fail;
          }
          case '/':
          { // YYYY/M/D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        }
      } else if (match[5] > 1901) {
        switch (match[2]) {
          case '-':
          { // D-M-YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // D.M.YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '/':
          { // M/D/YYYY
            if (match[1] > 12 || match[3] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        }
      } else {
        switch (match[2]) {
          case '-':
          { // YY-M-D
            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
              return fail;
            }

            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
            return new Date(year, parseInt(match[3], 10) - 1, match[5],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case '.':
          { // D.M.YY or H.MM.SS
            if (match[5] >= 70) { // D.M.YY
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }

              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                  match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
            }
            if (match[5] < 60 && !match[6]) { // H.MM.SS
              if (match[1] > 23 || match[3] > 59) {
                return fail;
              }

              today = new Date();
              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                  match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
            }

            return fail; // invalid format, cannot be parsed
          }
          case '/':
          { // M/D/YY
            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
              return fail;
            }

            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
            return new Date(year, parseInt(match[1], 10) - 1, match[3],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
          case ':':
          { // HH:MM:SS
            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
              return fail;
            }

            today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
          }
        }
      }
    }

    // other formats and "now" should be parsed by Date.parse()
    if (text === 'now') {
      return now === null || isNaN(now) ? new Date()
          .getTime() / 1000 | 0 : now | 0;
    }
    if (!isNaN(parsed = Date.parse(text))) {
      return parsed / 1000 | 0;
    }

    date = now ? new Date(now * 1000) : new Date();
    days = {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
    };
    ranges = {
      'yea': 'FullYear',
      'mon': 'Month',
      'day': 'Date',
      'hou': 'Hours',
      'min': 'Minutes',
      'sec': 'Seconds'
    };

    function lastNext(type, range, modifier) {
      var diff, day = days[range];

      if (typeof day !== 'undefined') {
        diff = day - date.getDay();

        if (diff === 0) {
          diff = 7 * modifier;
        } else if (diff > 0 && type === 'last') {
          diff -= 7;
        } else if (diff < 0 && type === 'next') {
          diff += 7;
        }

        date.setDate(date.getDate() + diff);
      }
    }

    function process(val) {
      var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
        type = splt[0],
        range = splt[1].substring(0, 3),
        typeIsNumber = /\d+/.test(type),
        ago = splt[2] === 'ago',
        num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

      if (typeIsNumber) {
        num *= parseInt(type, 10);
      }

      if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
        return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
      }

      if (range === 'wee') {
        return date.setDate(date.getDate() + (num * 7));
      }

      if (type === 'next' || type === 'last') {
        lastNext(type, range, num);
      } else if (!typeIsNumber) {
        return false;
      }

      return true;
    }

    times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
      '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
      '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
    regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

    match = text.match(new RegExp(regex, 'gi'));
    if (!match) {
      return fail;
    }

    for (i = 0, len = match.length; i < len; i++) {
      if (!process(match[i])) {
        return fail;
      }
    }

    // ECMAScript 5 only
    // if (!match.every(process))
    //    return false;

    return (date.getTime() / 1000);
  },

  mktime:function() {
    //  discuss at: http://phpjs.org/functions/mktime/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: baris ozdil
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: FGFEmperor
    // improved by: Brett Zamir (http://brett-zamir.me)
    //    input by: gabriel paderni
    //    input by: Yannoo
    //    input by: jakes
    //    input by: 3D-GRAF
    //    input by: Chris
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Marc Palau
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Theriault
    //        note: The return values of the following examples are
    //        note: received only if your system's timezone is UTC.
    //   example 1: mktime(14, 10, 2, 2, 1, 2008);
    //   returns 1: 1201875002
    //   example 2: mktime(0, 0, 0, 0, 1, 2008);
    //   returns 2: 1196467200
    //   example 3: make = mktime();
    //   example 3: td = new Date();
    //   example 3: real = Math.floor(td.getTime() / 1000);
    //   example 3: diff = (real - make);
    //   example 3: diff < 5
    //   returns 3: true
    //   example 4: mktime(0, 0, 0, 13, 1, 1997)
    //   returns 4: 883612800
    //   example 5: mktime(0, 0, 0, 1, 1, 1998)
    //   returns 5: 883612800
    //   example 6: mktime(0, 0, 0, 1, 1, 98)
    //   returns 6: 883612800
    //   example 7: mktime(23, 59, 59, 13, 0, 2010)
    //   returns 7: 1293839999
    //   example 8: mktime(0, 0, -1, 1, 1, 1970)
    //   returns 8: -1

    var d = new Date(),
      r = arguments,
      i = 0,
      e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

    for (i = 0; i < e.length; i++) {
      if (typeof r[i] === 'undefined') {
        r[i] = d['get' + e[i]]();
        r[i] += (i === 3); // +1 to fix JS months.
      } else {
        r[i] = parseInt(r[i], 10);
        if (isNaN(r[i])) {
          return false;
        }
      }
    }

    // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

    // Set year, month (-1 to fix JS months), and date.
    // !This must come before the call to setHours!
    d.setFullYear(r[5], r[3] - 1, r[4]);

    // Set hours, minutes, and seconds.
    d.setHours(r[0], r[1], r[2]);

    // Divide milliseconds by 1000 to return seconds and drop decimal.
    // Add 1 second if negative or it'll be off from PHP by 1 second.
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
  },

  date_parse:function(value){

    switch(value){
      case 'this_month':
        value = $.date('Ym') + '01-' + $.date('Ymd', $.mktime(0, 0, 0, parseInt($.date('m')) + 1, 0, $.date('Y')));
        break;
    }

    return value;

  },

  start_day_of_month:function(year, month){

    var N = $.date('N', $.mktime(0, 0, 0, month, 1, year));
    return N;
  },

  last_date_of_month:function(year, month){

    var d = 27;
    do{
      d++;
      var j = parseInt($.date('j', $.mktime(0, 0, 0, month, d, year)));

      if(j != d){
        d--;
        break;
      }
    }
    while(true);
    return d;
  },

  api_get:function(url, data, callback, errcallback){

    var qs = $.http_build_query(data);
    url += qs.length > 0 ? "?" + qs : '';

    // Process
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.addEventListener('load', function(){
      if(this.readyState == 4){

        var obj = $.eval_as_object(this.responseText);
        var error = $.val('error', obj, { d:0, datatype:"integer" });
        var error_message = $.val('error_message', obj, { d:'' });

        if(error > 0){
          if(errcallback != null)
            $.fire_event(errcallback, [ this.responseText ], xmlhttp);
          else
            alert(error_message);
        }
        else{
          $.fire_event(callback, [ obj ], xmlhttp);
        }

      }
    });
    xmlhttp.addEventListener('error', function(){
      if(typeof errcallback != 'undefined' || errcallback != null)
        $.fire_event(errcallback);
      else
        console.log(this.responseText);
    });
    xmlhttp.send();

    return xmlhttp;

  },
  api_post:function(url, data, callback, errcallback){

    // Process
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.addEventListener('load', function(){
      if(this.readyState == 4){
        var obj = $.eval_as_object(this.responseText);
        var error = $.val('error', obj, { d:0, datatype:"integer" });
        var error_message = $.val('error_message', obj, { d:'' });

        if(parseInt(error) == 0)
          $.fire_event(callback, [ obj ], xmlhttp);
        else{
          if(typeof errcallback != 'undefined' || errcallback != null)
            $.fire_event(errcallback, [ { error:error, error_message:error_message } ]);
          else{
            alert(JSON.stringify(obj, null, 2));
          }
        }
      }
    });
    xmlhttp.addEventListener('error', function(){
      if(typeof errcallback != 'undefined' || errcallback != null)
        $.fire_event(errcallback);
      else
        console.log(this.responseText);
    });
    xmlhttp.send(JSON.stringify(data));

    return xmlhttp;

  },

  http_build_query:function(obj, num_prefix, temp_key){

    var output_string = []

    if($.type(obj) == 'object'){
      Object.keys(obj).forEach(function (val) {

        var key = val;

        num_prefix && !isNaN(key) ? key = num_prefix + key : ''

        var key = encodeURIComponent(key.toString().replace(/[!'()*]/g, escape));
        temp_key ? key = temp_key + '[' + key + ']' : ''

        if (typeof obj[val] === 'object') {
          var query = $.http_build_query(obj[val], null, key)
          output_string.push(query)
        }

        else {
          var value = encodeURIComponent(obj[val].toString().replace(/[!'()*]/g, escape));
          output_string.push(key + '=' + value)
        }

      })
    }

    return output_string.join('&')

  },

  fire_event:function(callback, params, thisArg){

    if(typeof thisArg == 'undefined') thisArg = null; // Parameter 3 is optional, default: null
    if($.type(callback) == 'string')
      callback = eval(callback);
    if($.type(callback) == 'function')
      return callback.apply(thisArg, params);

  },

  eval_as_object:function(exp){

    try{
      return eval("(" + exp + ")");
    }
    catch(e){
      return null;
    }

  },

  ux:function(cont){

    cont = typeof cont == 'undefined' || !(cont instanceof HTMLElement) ? document.body : cont;

    var els = cont.querySelectorAll('*[data-type]');
    $(els).each(function(){

      var type = this.getAttribute("data-type");
      if(typeof $(this)[type] == 'function'){

        var options = $.options_from_html(this);
        $(this)[type](options);

      }
      else
        console.warn('Unknown ux ' + type);

    })

  },

  el_get:function(cont){


    if($(cont).attr('data-type') != null){

      var type = $(cont).attr('data-type');
      if(typeof $(cont)[type + "_get"] == 'function')
        return $(cont)[type + "_get"]();
      return null;

    }
    else{

      var obj = {};
      var els = $("*[data-type]", cont);
      $(els).each(function(){

        var el = this;
        var value = $.el_get(el);
        var name  = el.getAttribute("data-name");
        if(name == null) name = 'undefined';
        obj[name] = value;

      });
      return obj;

    }


  },

  el_set:function(cont, obj){

    $("*[data-type]", cont).each(function(){

      var type = this.getAttribute("data-type");
      var name = this.getAttribute("data-name");
      var value = $.val(name, obj);

      if(typeof $(this)[type + "_set"] == 'function')
        $(this)[type + "_set"](value);
      else
        console.warn('unknown method');

    });

  },

  options_from_html:function(el){

    var options = null;
    if(el.getAttribute("data-options") != null){
      try{
        options = eval("(" + el.getAttribute("data-options") + ")");
      }
      catch(e){
        options = null;
      }
    }
    else{

      var options = {};
      for(var i = 0 ; i < el.attributes.length ; i++)
        options[el.attributes[i].nodeName.replace('data-', '')] = el.attributes[i].nodeValue;

    }
    return options;

  },

  cookie_getitem:function(sKey){

    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

  },
  cookie_setitem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  cookie_removeitem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  cookie_hasitem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  cookie_keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },

  slug:function(str) {
    var $slug = '';
    var trimmed = $.trim(str);
    $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return $slug.toLowerCase();
  },

  warn:function(text){

    console.warn(text);

  },

  array_merge:function(){

    var args = Array.prototype.slice.call(arguments)
    var argl = args.length
    var arg
    var retObj = {}
    var k = ''
    var argil = 0
    var j = 0
    var i = 0
    var ct = 0
    var toStr = Object.prototype.toString
    var retArr = true

    for (i = 0; i < argl; i++) {
      if (toStr.call(args[i]) !== '[object Array]') {
        retArr = false
        break
      }
    }

    if (retArr) {
      retArr = []
      for (i = 0; i < argl; i++) {
        retArr = retArr.concat(args[i])
      }
      return retArr
    }

    for (i = 0, ct = 0; i < argl; i++) {
      arg = args[i]
      if (toStr.call(arg) === '[object Array]') {
        for (j = 0, argil = arg.length; j < argil; j++) {
          retObj[ct++] = arg[j]
        }
      } else {
        for (k in arg) {
          if (arg.hasOwnProperty(k)) {
            if (parseInt(k, 10) + '' === k) {
              retObj[ct++] = arg[k]
            } else {
              retObj[k] = arg[k]
            }
          }
        }
      }
    }

    return retObj;

  },

  in_array:function(needle, haystack, argStrict){

    var key = ''
    var strict = !!argStrict
    // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
    // in just one for, in order to improve the performance
    // deciding wich type of comparation will do before walk array
    if (strict) {
      for (key in haystack) {
        if (haystack[key] === needle) {
          return true;
        }
      }
    } else {
      for (key in haystack) {
        if (haystack[key] == needle) { // eslint-disable-line eqeqeq
          return true;
        }
      }
    }
    return false;

  },

  number_format:function(number, decimals, decPoint, thousandsSep){

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec)
      return '' + (Math.round(n * k) / k)
          .toFixed(prec)
    }

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)

  },

  qs:(function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&')),

  p:function(text, obj){

    var matches = text.match(/\$\w+/g);

    if(matches != null){
      if($.type(obj) == 'array'){

        for(var i = 0 ; i < matches.length ; i++){
          var match = matches[i];
          var value  = typeof obj[i] != 'undefined' ? obj[i] : '';
          text = text.replace(match, value);
        }

      }
      else if($.type(obj) == 'object'){

        for(var i = 0 ; i < matches.length ; i++) {
          var match = matches[i];
          var key = match.replace('$', '');
          var value = typeof obj[key] != 'undefined' ? obj[key] : '';
          text = text.replace(match, value);
        }

      }
    }


    return text;

  },

  array_key_count:function(obj){

    var count = 0;
    for(var key in obj)
      count++;
    return count;

  },

  object_value_min:function(obj){

    var min_val = -1;
    if($.type(obj) == 'object'){
      for(var key in obj){
        var val = obj[key];
        if(min_val == -1 || parseFloat(val) < parseFloat(min_val)){
          min_val = val;
        }
      }
    }
    return min_val;

  },

  object_value_max:function(obj){

    var max_val = -1;
    if($.type(obj) == 'object'){
      for(var key in obj){
        var val = obj[key];
        if(max_val == -1 || parseFloat(val) > parseFloat(max_val)){
          max_val = val;
        }
      }
    }
    return max_val;

  },

  ksort:function(obj){
    var keys = Object.keys(obj).sort()
    , sortedObj = {};

    for(var i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
  },

  str_pad:function(input, padLength, padString, padType){

    var half = ''
    var padToGo
    var _strPadRepeater = function (s, len) {
      var collect = ''
      while (collect.length < len) {
        collect += s
      }
      collect = collect.substr(0, len)
      return collect
    }
    input += ''
    padString = padString !== undefined ? padString : ' '
    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
      padType = 'STR_PAD_RIGHT'
    }
    if ((padToGo = padLength - input.length) > 0) {
      if (padType === 'STR_PAD_LEFT') {
        input = _strPadRepeater(padString, padToGo) + input
      } else if (padType === 'STR_PAD_RIGHT') {
        input = input + _strPadRepeater(padString, padToGo)
      } else if (padType === 'STR_PAD_BOTH') {
        half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
        input = half + input + half
        input = input.substr(0, padLength)
      }
    }
    return input;

  },

  template_parse:function(text, obj){

    // Find IF
    var matches = text.match(/<!--IF.+?(?=-->)(.+)?(?=<!--END-->)<!--END-->/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var matches = match.match(/\(.+?(?=\))\)/gi, 'gi');
        var key = matches[0];
        key = key.substr(1, key.length - 2);

        var f = new Function("obj", "return " + key + ";");
        if(!f(obj)){
          text = text.replace(match, '', 'gi');
        }

      }
    }

    // Find IFX
    var matches = text.match(/<!--IF_NOT_EMPTY.+?(?=-->)(.+)?(?=<!--END-->)<!--END-->/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var matches = match.match(/\(\w+\)/gi, 'gi');
        var key = matches[0];
        key = key.substr(1, key.length - 2);
        if($.val(key, obj, { d:'' }) == '')
          text = text.replace(match, '', 'gi');
      }
    }

    // Parse matched keys
    var matches = text.match(/{\w+(:\w+)*?(?=})}/gi, 'gi');
    if($.type(matches) == 'array'){
      for(var i = 0 ; i < matches.length ; i++){
        var match = matches[i];
        var key = match.substr(1, match.length - 2);
        var datatype = 'string';
        if(key.indexOf(':') >= 0){
          var keys = key.split(':');
          key = keys[0];
          datatype = keys[1];
        }
        var value = $.val(key, obj, { d:'-' });
        value = $.convert_datatype(value, datatype);
        text = text.replace(match, value, 'gi');
      }
    }

    return text;

  },

  convert_datatype:function(value, datatype){

    switch(datatype){

      case 'date':
        value = $.date('j M Y', $.strtotime(value));
        break;

    }

    return value;

  },

  calc_size:function(exp, val){

    val = typeof val == 'undefined' || !val ? window.innerWidth : val;

    if(exp.indexOf('%') >= 0){
      exp = exp.replace('%', '', 'gi');
      if(!isNaN(parseFloat(exp))) exp = parseFloat(exp) / 100 * val;
    }

    return exp;

  },

  download:function(url){

    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', url);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  },

  ux_init:function(cont){

    cont = typeof cont == 'undefined' || !(cont instanceof HTMLElement) ? document.body : cont;

    // Init
    $('*[data-type]', cont).each(function(){
      var type = this.getAttribute("data-type");
      if(typeof $(this)[type] == 'function'){
        var options = $.options_from_html(this);
        $(this)[type](options);
      }
      else
        console.warn('Unknown ux ' + type);
    })

    // Handle data-action
    $("*[data-action]", cont).each(function(){
      switch(this.getAttribute("data-action")){
        case "modal.close":
          $(this).on('click.data-action', function(){
            $(this).closest('.modal').modal_close();
          })
          break;
      }
    })

    // Handle popup close
    $(window).on('click', $.popup_close_all).on('scroll', $.popup_close_all);

    // Global keyboard handle
    $(window).on('keyup', function(e){
      switch(e.keyCode){
        case 27: $('.modal').modal_close(); break; // Esc button
      }
    })

    // Header, sidebar & content
    // var headerHeight = $('.header').outerHeight();
    // $('.content').css({ 'margin-top':headerHeight });
    //
    //
    // $.tab_init();
    // $.foldedpane_init();
    // $.section_init();
    // $.workspace_init();
    // $.role_init();
    //
    // $.layout_resize();
    // $(window).on('resize.layout', function(){ $.layout_resize(); });
    //
    // $('.header-bar-btn').click(function(){
    //
    //   $('.sidebar').toggleClass('on');
    //   $('.header').toggleClass('sidebar-on');
    //   $('.content').toggleClass('sidebar-on');
    //
    //   $.api_post('api/app/state/save', { 'sidebar-state':$('.sidebar').hasClass('on') ? 1: 0 });
    //
    // });
    //
    // $.ux();

  },

  istrue:function(val){

    if(typeof val != 'undefined' && (parseInt(val) == 1 || val === true)) return true;
    return false;

  },

});

var oldVal = $.fn.val;
$.fn.val = function(value) {

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_val'] != 'undefined')
    return $(this)[type + '_val'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_val.apply(this, arguments);
  else
    return oldVal.apply(this, arguments);

};

$.fn.placeholder = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_placeholder'] != 'undefined')
    return $(this)[type + '_placeholder'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_placeholder.apply(this, arguments);

};

$.fn.readonly = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_readonly'] != 'undefined')
    return $(this)[type + '_readonly'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_readonly.apply(this, arguments);

};

$.fn.reset = function(){

  var type = $(this).attr('data-type');
  if(type != null && typeof $(this)[type + '_reset'] != 'undefined')
    return $(this)[type + '_reset'].apply(this, arguments);
  else if($(this).hasClass('container'))
    return $(this).container_reset.apply(this, arguments);

};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

$($.ux_init);