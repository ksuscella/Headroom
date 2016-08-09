var lat = 0;
var lng = 0;
    
function letsPlay() {
    //code
    //var u = new SpeechSynthesisUtterance('Welcome to HeadRoom.  Lets explore the world around you');
    //speechSynthesis.speak(u);
    
    speak('Welcome to HeadRoom');
    speak('Lets explore the world around you');
    speak('Today is a beautiful day, lets begin');
    speak('Current Date and Time is ' + getFormatDate());
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            
              lat = position.coords.latitude
              lng = position.coords.longitude
              speak("I see your location is at " + round(lat,2) + " and " + round(lng,2));
              //speak("Lets check what's around you");
              findData();
        }
    )
    };

}
function getFormatDate() {
    //Pull Back Date in correct "speaking" format
    dt = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h MM TT");
    return dt;
}

function clearAlert() {
    //code
    window.clearTimeout(timeoutID);
}

function speakAndDelay(msg, delay) {

    var u = new SpeechSynthesisUtterance();
    u.lang = 'en-US';
    u.rate = 1.25;
    u.pitch = .95;
    u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Karen'; })[0];

    setTimeout(function() {
    //your code to be executed after 1 second
        u.text = msg;
        showConsole(msg);
        speechSynthesis.speak(u);
    }, delay);
}

function speak(msg) {
    speakAndDelay(msg, 1000) //1 second
}

function showConsole(alerts) {
    //code
    var com = document.getElementById("findings").innerHTML;
    document.getElementById("findings").innerHTML = "<p class='p-left'>" + Date() + " " + alerts + "</p>" + com;
}

function getCoordinate() {
    //Ask browser for coordinate
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
}

function pickArticle(json_results) {
    speak("I found " + json_results.length + " articles");
    //Randomly pick an article
    speak('Let me pick something for you');
    rdm = randomNumber(1,json_results.length)-1;
    showConsole(json_results[rdm].pageid);
    speak("Searching on " + json_results[rdm].title);
    findArticle(json_results[rdm].pageid);
    
}

function speakArticle(json_results) {
    speak(json_results[0].extract); //assume always one (need to add error chk'ing)
}

function findData() {
  //Get Information
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        txt = xhttp.responseText;
       
        //showConsole(txt);
        json_results = JSON.parse(txt);
        //showConsole(json_results.length);
        pickArticle(json_results);
    }
        
  };
  xhttp.open("GET", "../?type=geo&getLat="+lat+"&getLng="+lng, true);
  xhttp.send();
}

function findArticle(page_id) {
  //Get Information
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        txt = xhttp.responseText;
       
        showConsole(txt);
        json_results = JSON.parse(txt);
        speakArticle(json_results);
        //showConsole(json_results.length);
        //pickArticle(json_results);
    }
        
  };
  xhttp.open("GET", "../?type=pageid&getPageID="+page_id, true);
  xhttp.send();
}