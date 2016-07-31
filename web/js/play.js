function letsPlay() {
    //code
    //var u = new SpeechSynthesisUtterance('Welcome to HeadRoom.  Lets explore the world around you');
    //speechSynthesis.speak(u);
    
    var u = new SpeechSynthesisUtterance();
    u.lang = 'en-US';
    u.rate = 1.25;
    u.pitch = .95;
    txt = 'Welcome to HeadRoom';
    u.text = txt;
    showConsole(txt);
    speechSynthesis.speak(u);
    txt = 'Lets explore the world around you';
    u.text = txt;
    showConsole(txt);
    speechSynthesis.speak(u);
}

function clearAlert() {
    //code
    window.clearTimeout(timeoutID);
}

function showConsole(alerts) {
    //code
    var com = document.getElementById("findings").innerHTML;
    document.getElementById("findings").innerHTML = com + "<p class='p-left'>" + Date() + " " + alerts + "</p>";
}