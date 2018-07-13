/* more-bootstrap.js
 * This file provides some common utility functions that are handy to use. 
 * */

jQuery.formatDateTime = function formatDateTime(dateArg, format) {
	var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var result = "";
	dateArg = dateArg.replace(/-/g , "/");
	var date = new Date(dateArg);
	var year = date.getFullYear(), month = date.getMonth(), dayOfMonth = date.getDate(), dayOfWeek = date.getDay(),
		hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds(), millis = date.getMilliseconds();
	var dateParameters = [], timeParameters = [];
	var dateDelimiter = null, timeDelimiter = null;

	if(format.indexOf("-") > -1 && format.indexOf(":") > -1) {
		var parameters = format.split(" ");
		dateParameters = parameters[0].split("-");
		timeParameters = parameters[1].split(":");
		dateDelimiter = "-";
		timeDelimiter = ":";
	} else if(format.indexOf("/") > -1 && format.indexOf(":") > -1) {
		var parameters = format.split(" ");
		dateParameters = parameters[0].split("/");
		timeParameters = parameters[1].split(":");
		dateDelimiter = "/";
		timeDelimiter = ":";
	} else if(format.indexOf("-") > -1) {
		dateParameters = format.split("-");
		dateDelimiter = "-";
	} else if(format.indexOf("/") > -1) {
		dateParameters = format.split("/");
		dateDelimiter = "/";
	} else if(format.indexOf(",") > -1) {
		dateParameters = format.split(",");
		dateDelimiter = ", ";
	} else if(format.indexOf(":") > -1) {
		timeParameters = format.split(":");
		timeDelimiter = ":";
	} else if(format.indexOf(".") > -1) {
		timeParameters = format.split(".");
		timeDelimiter = ".";
	}
	
	$.each(dateParameters, function(index, value) {
		var temp = value.split(" ");
		if(temp.length > 1) {
			$.each(temp, function(i, v) {
				if(i == 1) {
					dateResult(v, " ");
				} else {
					dateResult(v, null);
				}
			});
		} else {
			dateResult(value, null);
		}
	});
	
	function dateResult(value, customDelimiter) {
		if(result && customDelimiter != null) {
			result += customDelimiter;
		} else if(result && customDelimiter == null) {
			result += dateDelimiter;
		}
		if(value == "yyyy") {
			result += year;
		} else if(value == "yy") {
			result += ("'" + year.toString().slice(-2));
		} else if (value == "MMM") {
			result += MONTHS[month];
		} else if (value == "MM") {
			month = month + 1;
			result += ((month < 10) ? ("0" + month) : month);
		} else if (value == "dd") {
			result += ((dayOfMonth < 10) ? ("0" + dayOfMonth) : dayOfMonth);
		} else if(value == "EEE") {
			result += DAYS[dayOfWeek];
		}
	}
	
	$.each(timeParameters, function(index, value) {
		if((index ==0 && result) || value == "a") {
			result += " ";
		} else if (result){
			result += timeDelimiter;
		}
		if (value == "hh") {
			if($.inArray( "a", timeParameters ) > -1) {
				hour = ((hour < 10) ? ("0" + hour) : hour);
				result += (hour > 12) ? (hour-12) : hour;
			} else {
				result += ((hour < 10) ? ("0" + hour) : hour);
			}
		} else if (value == "mm") {
			result += ((minute < 10) ? ("0" + minute) : minute);
		} else if (value == "ss") {
			result += ((second < 10) ? ("0" + second) : second);
		} else if (value == "S") {
			if(millis < 10) {
				result += ("00" + millis);
			} else if(millis < 100) {
				result += ("0" + millis);
			} else {
				result += millis;
			}
		} else if (value == "a") {
			result += (hour <= 12) ? "AM" : "PM";
		}
	});
	return result;
}