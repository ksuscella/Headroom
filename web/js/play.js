

    
function letsPlay() {
    //code
    //var u = new SpeechSynthesisUtterance('Welcome to HeadRoom.  Lets explore the world around you');
    //speechSynthesis.speak(u);
    
    speak('Welcome to HeadRoom');
    speak('Lets explore the world around you');
    speak('Today is a beautiful day, lets begin');
    speak('');
    
    speak('Current Date and Time is ' + getFormatDate());
    speak("Lets check what's around you");
    
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

function speak(msg) {
    var delay=1000; //1 second
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

function showConsole(alerts) {
    //code
    var com = document.getElementById("findings").innerHTML;
    document.getElementById("findings").innerHTML = "<p class='p-left'>" + Date() + " " + alerts + "</p>" + com;
}