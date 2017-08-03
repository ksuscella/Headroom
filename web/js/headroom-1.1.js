/*
 * HeadRoom
 *  Collect situational awareness
 *  Search, collect & categorize information
 *  Select the 'secret sauce' and communicate to user
 */

var user_loc_stats = [];    //LOG of USER Locations
var article_list = [];
var user_articles = {weather:'',articles:[]};     //LOG of ARTICLES
var user_state='PLAY';      //Options: PLAY PAUSE CONTINUE
var lat = 0;
var lng = 0;

// -- -------SPEAKING METHODS-------------

function speakArticle(json_results) {
    speak(json_results[0].extract); //assume always one (need to add error chk'ing)
}

function speakAndDelay(msg, delay) {
    voices = ['Karen', 'Alex', 'Daniel', 'Melina'];
    var u = new SpeechSynthesisUtterance();
    u.lang = 'en-US';
    u.rate = .90;
    u.pitch = .95;
    //u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Karen'; })[0];
    //sName = randomNumber(0,voices.length)-1;
    //u.voice = speechSynthesis.getVoices().filter(function(voice) {return voice.name == sName;})[0];
    setTimeout(function() {
    //your code to be executed after 1 second
        u.text = msg;
        showConsole(msg);
        speechSynthesis.speak(u);
    }, delay);
}

function speak(msg) {
    if (user_state == 'PLAY' || user_state=='CONTINUE') {
        speakAndDelay(msg, 1000) //1 second
    }
    
}

// -- ---------DATA METHODS---------------

function findData() {
    // ** Recursive Method **
    // ** Find Data & Populate Document **

    if (user_state != 'PAUSE'){    //STOP
        setTimeout(function() {
            showConsole('findData looper');
            
            // Should I get weather? (NOAA)
            // Update weather every 15 minutes
            if ((15 - getCurrentMinute() % 15) == 15){ 
                updateWeather();
            }
            // Should I get more location articles? (Wikipedia)
            populateArticles();
            findData();
        }, 30000); //30 seconds
    }    
}

function populateArticles() {
  //Lets see what we can find
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        txt = xhttp.responseText;
       
        json_results = JSON.parse(txt);
        //Loop through articles and include new ones
        console.log(json_results);
        for (key in json_results){
            //console.log(json_results[key].pageid);
            if (user_articles.articles.indexOf(json_results[key].pageid) == -1){
                //Add article to users_articles
                findArticle(json_results[key].pageid);
            }
        }
        
    }
        
  };
  xhttp.open("GET", "../?type=geo&getLat="+lat+"&getLng="+lng, true);
  xhttp.send();
}

function pickArticle(json_results) {
    var m_pageid = 0;
    var m_title = '';
    var m_dist = 99999;

    if (json_results.length == 0 ) {
        //Didn't find anything
    } else {
        //Loop over JSON
        for (var key in json_results) {
            //if (json_results.hasOwnProperty(key)) {
            //Lets find the closest article
            //if (json_results[key].dist < m_dist) {
                //Did we already pick this article?
                if (user_articles.articles.indexOf(json_results[key].pageid) == -1) {
                    //Lets post it in
                    console.log(json_results[key]);
                    //m_dist = json_results[key].dist;
                    //m_pageid = json_results[key].pageid;
                    //m_title = json_results[key].title;
                }
            //}
        }
    }
    //showConsole(m_pageid + ', ' + m_title + ', ' + m_dist);
    //rdm = randomNumber(1,json_results.length)-1;
    //if (m_pageid != 0) {
    //    article_list.push(m_pageid);
    //    findArticle(m_pageid);   
    //} else {
    //    showConsole("sorry, I couldn't find anything, try again shortly");
    //}
}

function updateWeather() {
  //Reach out to service to attain weather information
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        weather_response = xhttp.responseText;
        json_results = JSON.parse(weather_response);
        user_articles.weather = json_results; 
    }   
  };
  xhttp.open("GET", "../?type=weather&getLat="+lat+"&getLng="+lng, true);
  xhttp.send();
}

function findArticle(page_id) {
  //Get Information
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        txt = xhttp.responseText;
       
        //showConsole(txt);
        json_results = JSON.parse(txt);
        console.log(json_results);
        user_articles.articles.push(json_results[0]);
        console.log(user_articles);
        //speakArticle(json_results);
        //showConsole(json_results.length);
        //pickArticle(json_results);
    }
        
  };
  xhttp.open("GET", "../?type=pageid&getPageID="+page_id, true);
  xhttp.send();
}


// -- ----------GUI METHODS---------------
function letsPlay() {
    // *** STARTS HERE ***
    // Start from the beginning
    
    if (navigator.geolocation) {  //Grab user location
            navigator.geolocation.getCurrentPosition(locCaptureFirst);
    }
    
    guiStatus();    // Manage GUI
    locRefresh();   // Log Users Location
    //findData();      // Find Data Sources
    
}

function letsPause() {
    // Pause Speaking
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
}
function letsContinue() {
    // Start Back Up Again
    
    //speak('Glad to be back online');
    //geoSpeakLocate();
    //looper();
}

function locCapture(position) {
    //** Log Location to Dictionary     
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    
    rec = {"ltime":new Date(),
            "lat":lat,
            "lng":lng};
    user_loc_stats.push(rec);
    console.log(rec);
    if (user_loc_stats.length > 10) {
        user_loc_stats.shift();
    }
}

function locCaptureFirst(position) {
    //** Log Location to Dictionary     
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    
    rec = {"ltime":new Date(),
            "lat":lat,
            "lng":lng};
    user_loc_stats.push(rec);
    console.log(rec);
}

function locRefresh() {
    //** Loop & Log User Location **
    setTimeout(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locCapture);
        }
        showConsole('location looper');
        //console.log(user_loc_stats);
        locRefresh();
    }, 30000); 
}

function showConsole(alerts) {
    //code
    var com = document.getElementById("findings").innerHTML;
    document.getElementById("findings").innerHTML = "<p class='p-left'>" + Date() + " " + alerts + "</p>" + com;
}

function clearAlert() {
    //code
    window.clearTimeout(timeoutID);
}

function guiStatus() {
    //Manage Text
    instr_pause ='Press <b>PAUSE</b> to see the world around you';         //Need to move text to a file
    instr_cont = 'Press <b>CONTINUE</b> to listen to the world around you'; //Need to move text to a file

     //Manage Button State
    var butt = document.getElementById("speak_button");
    var instr = document.getElementById("instructions");
    test_state = butt.innerHTML; //evaluate button state
    
    if (test_state == 'PLAY') {
        //Update Text Box & Start Speaking
        user_state = 'PLAY';
        butt.innerHTML = 'PAUSE';
        butt.setAttribute("class", "btn btn-lg btn-danger");
        //butt.setAttribute("class", "fa fa-spinner fa-spin");
        instr.innerHTML = instr_pause;
    }
    if (test_state == 'PAUSE') {
        //Stop Speaking & updates text/buttons
        user_state = 'PAUSE';
        butt.innerHTML = 'CONTINUE';
        butt.setAttribute("class", "btn btn-lg btn-success");
        instr.innerHTML = instr_cont;
    }
    if (test_state == 'CONTINUE'){
        //Pick Up Where User Paused
        user_state = 'CONTINUE';
        butt.innerHTML = 'PAUSE';
        butt.setAttribute("class", "btn btn-lg btn-danger");
        //butt.setAttribute("class", "fa fa-spinner fa-spin");
        
        instr.innerHTML = instr_pause;
    }
}

// -- ----------UTIL METHODS---------------

function getFormatDate() {
    //Pull Back Date in correct "speaking" format
    dt = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h MM TT");
    return dt;
}

function getLogDate() {
    //Pull Back Date for logging
    dt = dateFormat(new Date(), "yyyymmddhhMMss");
    return dt;
}

function getCurrentMinute() {
    //Pull Back Current Minute
    dt = dateFormat(new Date(), "MM");
    return dt;
}