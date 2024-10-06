function angleMeterInit(){
  for(var i=0; i<360/15*2; i++){
    var newElement = document.createElement("p");
    newElement.innerHTML = i*15%360 - 180;
    $("#angleMeterVertical>div>div").append(newElement);
  }

  for(var i=0; i<360/15*2; i++){
    var newElement = document.createElement("p");
    newElement.innerHTML = i*15%360;
    $("#angleMeterHorizontal>div>div").append(newElement);
  }
}

$(document).ready(function(){
  angleMeterInit();
});