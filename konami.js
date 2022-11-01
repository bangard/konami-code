 
// store the keycodes as an array:
var keysDesired = "injects3crets"

// create a place where we can remember what keys the users pushed
var keysPressed =  "";
var info_panel = document.getElementById("info");
var info_str = "";
var code_input = document.getElementById('konami_code');


  // add an event listener to the body that listens for keys being pressed
code_input.addEventListener('keyup', function(event){ 
  if(event.key == "Escape"){
    code_input.value = "";
    return;
  }
  keysPressed =code_input.value; 
  // compare the solution to what the user pressed
  console.log(keysPressed, keysDesired)
  if (keysPressed === keysDesired) {
    loadDoc();
  } 
})
function resetInput() {
  code_input.value = "";
  setTimeout(() => {
    console.log("Delayed for 5 second.");
    resetInput()
  }, 15000)
}

function clearInfo() {
  setTimeout(() => {
    console.log("Delayed for 15 second.");
    info_str = "";
    info_panel.innerHTML = "";
  }, 15000)
}
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    try
    { 
      var data = JSON.parse(this.responseText);
      data.sort((a,b)=>{
        return Date.parse(b.created_at) -  Date.parse(a.created_at);
      });
      var latest_data = data.slice(0,5) 
      for (var i = 0; i < latest_data.length; i++) { 
        var username = latest_data[i].user.login;
        var issue_name = latest_data[i].title;
        info_str += `<li>${issue_name} - ${username}</li>`
      }
      info_panel.innerHTML = info_str;
      clearInfo();
    } catch(e) {

    }
  }
  xhttp.open("GET", "https://api.github.com/repos/elixir-lang/elixir/issues", true);
  xhttp.send();
}

resetInput();