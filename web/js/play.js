var lat = 0;    //Track User's Location to find geoArticles
var lng = 0;    //Track User's Location to find geoArticles
var user_state='PLAY'; //Options: PLAY PAUSE CONTINUE
var instr_pause = 'Press <b>PAUSE</b> to see the world around you';         //Need to move text to a file
var instr_cont = 'Press <b>CONTINUE</b> to listen to the world around you'; //Need to move text to a file

function speakSpeak() {
    //*** LETS GET THIS STARTED ***
    //Run through guiSetup to determine state of the button
    //Then determine which method to execute...letsPlay(), letsPause() or letsConintue
    
    guiSetup(); //Manage GUI State in case we need to pause
    
    if (user_state=='PLAY') {
        letsPlay();      }      //Start speaking
    if (user_state=='PAUSE') {
        letsPause();     }      //Stop speaking
    if (user_state=='CONTINUE') {
        letsContinue();  }      //Continue speaking
}


function letsPlay() {

    speak('Welcome to HeadRoom');
    speak('I am at beta version 0.1');
    speak('Lets explore the world around you');
    speak('Before we begin there are a couple of things to note');
    speak('This version does not keep track of articles');
    speak('As you listen to Head Room, it will randomly assign an article');
    speak('This means for this version, you could get article duplication');
    speak('This issue will be fixed in the next version');
    speak('Thank you for listening, I really appreciate it!');
    //speak('Today is a beautiful day, lets begin');
    speak('Current Date and Time is ' + getFormatDate());
    geoSpeakLocate();
    

}
function geoSpeakLocate() {
    //code
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            
              lat = position.coords.latitude
              lng = position.coords.longitude
              speak("I see your location is at " + round(lat,2) + " and " + round(lng,2));
              speak("Lets check what's around you");
              findData();
        }
    )
    };
}

function letsPause() {
    //code
    showConsole('PAUSE');
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
}
function letsContinue() {
    //code
    showConsole('CONTINUE');
    speak('Glad to be back online');
    //speak('Lets see what\'s around you');
    geoSpeakLocate();
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
    if (user_state == 'PLAY' || user_state=='CONTINUE') {
        speakAndDelay(msg, 1000) //1 second
    }
    
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

function guiSetup() {
     //Manage Button State
    var butt = document.getElementById("speak_button");
    var instr = document.getElementById("instructions");
    
    test_state = butt.innerHTML; //evaluate button state
    
    if (test_state == 'PLAY') {
        //Update Text Box & Start Speaking
        user_state = 'PLAY';
        butt.innerHTML = 'PAUSE';
        butt.setAttribute("class", "btn btn-lg btn-danger");
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
        instr.innerHTML = instr_pause;
    }
    
}