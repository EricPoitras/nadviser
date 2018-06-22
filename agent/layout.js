(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, queryButton, resultDiv, accessTokenInput;
  const artyom = new Artyom();
    
  window.onload = init;

  function init() {
    // Call the text to speech synthesis library
    
      
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    queryButton = document.getElementById("querysubmitbutton");
    //accessTokenInput = document.getElementById("access_token");
    //var setAccessTokenButton = document.getElementById("set_access_token");

    queryButton.addEventListener("click", queryInputKeyDown);
    //setAccessTokenButton.addEventListener("click", setAccessToken);
    window.init("36cd08216d9542fc9596d2ae46266c4d");
  }
/*
  function setAccessToken() {
    document.getElementById("placeholder").style.display = "none";
    document.getElementById("main-wrapper").style.display = "block";
    window.init(accessTokenInput.value);
  }*/

  function queryInputKeyDown(event) {
    /*if (event.which !== ENTER_KEY_CODE) {
      return;
    }*/

    var value = queryInput.value;
    //alert(value);
    queryInput.value = "";

    createQueryNode(value);
    var responseNode = createResponseNode();
    
      
    sendText(value)
      .then(function(response) {
        var result;
        try {
          result = response.result.fulfillment.speech
        } catch(error) {
          result = "";
        }
        setResponseJSON(response);
        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseJSON(err);
        setResponseOnNode("Something goes wrong", responseNode);
      });
      
    
  }

  function createQueryNode(query) {
    var node = document.createElement('div');
    node.className = "card p-3 w-75 float-right text-right m-1 bg-light";
    node.innerHTML = query;
    resultDiv.appendChild(node);
    // Text to speech synthesis
    artyom.say(query);
  }

  function createResponseNode() {
    var node = document.createElement('div');
    node.className = "card p-3 w-75 float-left m-1 bg-light";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;
  }

  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
      
    // Text to speech synthesis
    console.log(response);
    artyom.say(response);
    var speaking = false;
    
    function speakNode() {
      if (!response || speaking) {
        return;
      }
      speaking = true;
      tts(response)
        .then(function () {speaking = false})
        .catch(function (err) {
          speaking = false;
          Materialize.toast(err, 2000, 'red lighten-1');
        });
    }

    node.addEventListener("click", speakNode);
    speakNode();
  }

  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
