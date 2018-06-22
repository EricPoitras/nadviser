/*

1. Add both id and class references for the event listeners to identify and log the type of user interaction and what element is affected

Example: id="logvideo1"
Example: class="logmouseonclick logmouseondblclick logmouseoncontext logmouseonenter logmouseonleave logtouchstart logtouchend logtouchenter logtouchleave logonchange"

2. The functions below stringify a JSON object, adds it to local storage, and sends it to a JSON document

3. Assumes that username information is stored in local storage - see variables

Contact Information:
Eric Poitras
eric.poitras@utah.edu
801-587-1843

*/

// Variable List

var docurl = '';
var eventlabel = '';
var d = '';
var n = '';
var docheight = '';
var docwidth = '';
var deviceheight = '';
var devicewidth = '';
var bodyheight = '';
var bodywidth = '';
var x = '';
var y = '';
var pagexoffset = '';
var pageyoffset = '';
var counter = 0;
var timer = 0;

var jsonObj = [];


//Session identifier
function setsessionid(){
    if (sessionStorage.getItem("sessionid") === null) {
        var sessionid = Math.floor(Math.random()*1000000000001);
        sessionStorage.sessionidentifier = sessionid;
    } 
}


// Interval loop to log mouse cursor movements for each 0.5 second or 200 milliseconds - Confirm is working
setInterval("setmousecursorvariables()", 200);

// Set mouse cursor position - x and y coordinates across the width and height of the document body
document.onmousemove = function(e) { //Confirm is working
if (typeof e == 'undefined') {
	myEvent = window.event;
} else {
	myEvent = e;
}
if(myEvent.clientX){
	x = myEvent.clientX+document.body.scrollLeft;
	y = myEvent.clientY+document.body.scrollTop;
}
else if(myEvent.pageX){
	x = myEvent.pageX+window.pageXOffset;
	y = myEvent.pageY+window.pageYOffset;
}
//For testing purposes, use these to test the function in the console and document body
//console.log(x+" "+y);
//document.getElementById("test").innerHTML=x+"+"+y;
}

//List of event listeners using jQuery core library
$(document).ready(function(){
    
//Page is loaded in view - Confirmed is working
eventlabel = "OnPageLoad"; //Assign custom id such as logmouseonclick1
setvariables();
incrementcounter();
logobjectevent();
setsessionid();
    
$(document).on("unload",function(){
    eventlabel = "OnPageUnLoad"; //Assign custom id 
    setvariables();
    incrementcounter();
    logobjectevent();
});

//Mouse events

$(document).on("click",".logmouseonclick",function(){
    //Click on an element - Confirmed is working
    eventlabel = "Mouse Click: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logmouseevents();
});

$(document).on("dblclick",".logmouseondblclick",function(){
    //Double click on an element - Confirmed is working
    eventlabel = "Dbl Mouse Click: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logmouseevents();
});

$(document).on("contextmenu",".logmouseoncontext",function(){
    //Right click on an element - Confirmed is working
    eventlabel = "Context Menu: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logmouseevents();
});
    
$(document).on("mouseenter",".logmouseonenter",function(){
    //Pointer onto an element - Confirmed is working
    eventlabel = "Mouse Enter: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logmouseevents();
});

$(document).on("mouseleave",".logmouseonleave",function(){
    //Pointer out of an element - Confirmed is working
    eventlabel = "Mouse Leave: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logmouseevents();
});

// Touch Events

$(document).on("touchstart",".logtouchstart",function(){
    //Touch event started - Confirmed is working
    eventlabel = "Touch Start: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logtouchevents();
});

$(document).on("touchend",".logtouchend",function(){
    //Touch event end - Confirmed is working
    eventlabel = "Touch End: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logtouchevents();
});

$(document).on("touchenter",".logtouchenter",function(){
    //Touch event enters the bound element - Unconfirmed
    eventlabel = "Touch Enter: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logtouchevents();
});

$(document).on("touchleave",".logtouchleave",function(){
    //Touch event leaves the bound element - Unconfirmed
    eventlabel = "Touch Leave: "+$(this).attr('id'); //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logtouchevents();
});

// Frame and Object Events

$(document).on("scroll",function(){
    //Page is scrolled by user - Confirmed is working
    eventlabel = "OnScroll"; //Assign custom id such as logmouseonclick1
    setvariables();
    setscreenvariables();
    incrementcounter();
    logobjectevent();
});
    
$(window).on("resize",function(){
   //Page is resized by user - Confirmed is working
    eventlabel = "OnResize"; //Assign custom id such as logmouseonclick1
    setvariables();
    setscreenvariables();
    incrementcounter();
    logobjectevent(); 
});

// Form Events

$(document).on("change paste keyup",".logonchange",function(){
    //Form element, selection or checked state is modified - Confirmed is working
    var value = $(this).val();
    console.log("Value: " + value);
    var text = $(this).text();
    console.log("Text: " + text);
    var returnvalue = "";
    if(value != null){
        returnvalue = value;
    }
    else if(text != null){
        returnvalue = text;
    }
    else{
        returnvalue = "undefined value";
    }
    eventlabel = "Change: "+$(this).attr("id")+"; "+returnvalue; //Assign custom id such as logmouseonclick1
    setvariables();
    incrementcounter();
    logformevent();
});
    
    
});

function setvariables(){
    //Get document url
    docurl = document.URL;
    //Get timestamp
    d = new Date();
    n = d.toUTCString();
}

function setscreenvariables(){
    //Viewport size
    docheight = document.documentElement.clientHeight;
    docwidth = document.documentElement.clientWidth;
    //Device size
    deviceheight = window.screen.height;
    devicewidth = window.screen.width;
    //Document size
    bodyheight = document.body.clientHeight;
    bodywidth = document.body.clientWidth;
    //Pixel number scrolled from upper left corner of the document, horizontally and vertically
    pagexoffset = window.pageXOffset;
    pageyoffset = window.pageYOffset;
}

function setmousecursorvariables(){
    //Log mouse cursor in 0.2 seconds increment - 5 datapoints per second; set the timer value
    timer += 0.2;
    //Call function to get size dimensions for screen, viewport, document, scroll
    setscreenvariables();
    //Update timestamp
    setvariables();
    //Increment the counter
    incrementcounter();
    //Call function to get cursor position
    logmousepositions();
}

function incrementcounter(){
    //Set counter
    counter += 1;
}





function logmouseevents(){
    // Log Entry for Date, Label, and Description for each user interaction event - copy/paste and edit content of label and description
    //Example: $.post("nhmuresearchsqllogdata.php",{logdate: n, loglabel: docurl, logdescription: eventlabel});
    //console.log("Timestamp: "+n+"; Timer: "+timer+"; Counter: "+counter+"; Webpage: "+docurl+"; Label: "+eventlabel);
    //$.post("/admin/nhmuresearchlog/logmouseevents.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, loglabel: eventlabel});
    
    
    item = {}
    item["session"] = sessionStorage.sessionidentifier;
    item["timestamp"] = n;
    item["timer"] = timer;
    item["counter"] = counter;
    item["webpage"] = docurl;
    item["label"] = eventlabel;
    jsonObj.push(item);
    sessionStorage.jsonObjString = JSON.stringify(jsonObj); 
    
}

function logmousepositions(){
    //console.log("Timestamp: "+n+"; Timer: "+timer+"; Counter: "+counter+"; Webpage: "+docurl+"; MouseCursorX: "+x+"; MouseCursorY: "+y+"; DocWidth: "+docwidth+"; DocHeight: "+docheight+"; DeviceWidth: "+devicewidth+"; DeviceHeight: "+deviceheight+"; PageXOffset: "+pagexoffset+"; PageYOffset: "+pageyoffset+"; BodyHeight: "+bodyheight+"; BodyWidth: "+bodywidth);
    //$.post("/admin/nhmuresearchlog/logmousepositions.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, logmousecursorx: x, logmousecursory: y, logdocwidth: docwidth, logdocheight: docheight, logdevicewidth: devicewidth, logdeviceheight: deviceheight, logpagexoffset: pagexoffset, logpageyoffset: pageyoffset, logbodyheight: bodyheight, logbodywidth: bodywidth});
    /*
    
    item = {}
    item["session"] = sessionStorage.sessionidentifier;
    item["timestamp"] = n;
    item["timer"] = timer;
    item["counter"] = counter;
    item["webpage"] = docurl;
    item["label"] = "MouseCursorPosition";
    item["cursorX"] = x;
    item["cursorY"] = y;
    item["docwidth"] = docwidth;
    item["docheight"] = docheight;
    item["devicewidth"] = devicewidth;
    item["deviceheight"] = deviceheight;
    item["pagexoffset"] = pagexoffset;
    item["pageyoffset"] = pageyoffset;
    item["bodyheight"] = bodyheight;
    item["bodywidth"] = bodywidth;
    jsonObj.push(item);
    sessionStorage.jsonObjString = JSON.stringify(jsonObj); 
    */
    
}

function logtouchevents(){
    //console.log("Timestamp: "+n+"; Timer: "+timer+"; Counter: "+counter+"; Webpage: "+docurl+"; Label: "+eventlabel);
    //$.post("/admin/nhmuresearchlog/logtouchevents.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, loglabel: eventlabel});
    
    
    item = {}
    item["session"] = sessionStorage.sessionidentifier;
    item["timestamp"] = n;
    item["timer"] = timer;
    item["counter"] = counter;
    item["webpage"] = docurl;
    item["label"] = eventlabel;
    jsonObj.push(item);
    sessionStorage.jsonObjString = JSON.stringify(jsonObj); 
    
    
}

function logobjectevent(){
    //console.log("Timestamp: "+n+"; Timer: "+timer+"; Counter: "+counter+"; Webpage: "+docurl+"; Label: "+eventlabel);
    //$.post("/admin/nhmuresearchlog/logobjectevent.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, loglabel: eventlabel});
    
    
    item = {}
    item["session"] = sessionStorage.sessionidentifier;
    item["timestamp"] = n;
    item["timer"] = timer;
    item["counter"] = counter;
    item["webpage"] = docurl;
    item["label"] = eventlabel;
    jsonObj.push(item);
    sessionStorage.jsonObjString = JSON.stringify(jsonObj);
    
    
}

function logformevent(){
    //console.log("Timestamp: "+n+"; Timer: "+timer+"; Counter: "+counter+"; Webpage: "+docurl+"; Label: "+eventlabel);
    //$.post("/admin/nhmuresearchlog/logformevent.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, loglabel: eventlabel});
    
    
    item = {}
    item["session"] = sessionStorage.sessionidentifier;
    item["timestamp"] = n;
    item["timer"] = timer;
    item["counter"] = counter;
    item["webpage"] = docurl;
    item["label"] = eventlabel;
    jsonObj.push(item);
    sessionStorage.jsonObjString = JSON.stringify(jsonObj); 
    
    
}

window.onbeforeunload = WindowCloseHanlder;

function WindowCloseHanlder()
{	
    console.log(sessionStorage.jsonObjString);
    
    $.ajax({
        url: 'data/logJSON.php',
        method: 'post',
        data: {'data':sessionStorage.jsonObjString},
        success: function(response){
        console.log(response);
        }
    });
}
