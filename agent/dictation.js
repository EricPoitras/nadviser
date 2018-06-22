const artyom = new Artyom();
var audiolisten = true;
var speechtotext = "";

var UserDictation = artyom.newDictation({
    continuous:true, // Enable continuous if HTTPS connection
    onResult:function(text){

    // Do something with the text
    console.log(text);
    if(text === "" || text === " "){
        console.log("Dictation is empty...");
    }
    else{
        speechtotext = text;
        $("#q").val(speechtotext);
    }
},
onStart:function(){
    console.log("Dictation started by the user");
},
onEnd:function(){
    console.log("Dictation stopped by the user");
}
},10000);



$(document).ready(function(){
    $("#audiobutton").click(function(){
        
    if(audiolisten == true){
    $("#audiobutton").css("color","crimson");
    UserDictation.start();
    audiolisten = false;
    } else{
    // Stop whenever you want
    $("#audiobutton").css("color","white");
    UserDictation.stop();
    audiolisten = true;
    speechtotext = "";
    }
      

    
    });
});


