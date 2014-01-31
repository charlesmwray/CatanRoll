var rolls = [];
var data = [0,0,0,0,0,0,0,0,0,0,0];


function roll() {

  var tObj = {}
  
  var r1 = Number.random(1,6);
  var r2 = Number.random(1,6);
  
  var t = r1+r2;

  $('.dice').html("<span class='diceify'>" + r1 + r2 + "</span>" + " " + t);
  
  if (t == 6 || t == 8) {
    $('.dice').addClass('red').removeClass('robber');
  } else if (t == 7) {
    $('.dice').addClass('robber').removeClass('red');
  } else {
    $('.dice').removeClass('red robber')
  }

 /* tObj.r1 = r1;
  tObj.r2 = r2;
  tObj.t = t;*/
  
  rolls.push(t);
  
  //console.log(rolls);
  
  count(rolls);
}


function count(arr) {

  var result = {};
  
  for(i = 0; i < arr.length; ++i) {
    if(!result[arr[i]])
        result[arr[i]] = 0;
    ++result[arr[i]];
  }
  
  for (prop in result) {
    result[prop] = (result[prop]/rolls.length*100).toFixed(2).replace(/\"/g,"");
  }
  
  
  var str = JSON.stringify(result);
  
  //console.log(str.replace(/\"/g,""));
  
  for (prop in result) {
  
    for (i=0; i <= 12; i++) {
      console.log(i + " " + result[i]);
      data[i] = result[i];
    }
    
  }
  
  
  
  refreshChart();
  
  //$("#freq").html(str.replace(/,/g,"<br>").replace(/{/g,"").replace(/}/g,"").replace(/\"/g,"").replace(/:/g," - "));
  
  
} 

function refreshChart(){
  console.log(data);
  
  var barChartData = {
  labels : ["2","3","4","5","6","7","8","9","10","11","12"],
  datasets : [
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      data : data.slice(2)
    },
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      data : [2.78,5.56,8.33,11.11,13.89,16.67,13.89,11.11,8.33,5.56,2.78]            
    }
  ]
}
  
  var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);

}

$(document).ready(function() {
  var w = $(window).width();
  var h = $(window).height();
  var diceAreaHeight = $(".dice").height();
  var buttonAreaHeight = $("button").height();


  $("body").append('<canvas id="canvas"></canvas>')
  $("#canvas").height(h-(diceAreaHeight+buttonAreaHeight));
  $("#canvas").width(50);

});
