var rolls = [];
var percentageData = [0,0,0,0,0,0,0,0,0,0,0];

function retRandArr() {
  var num = [];

  for(var i=0; i<6; i++) {
    num.push(Number.random(1,6));
  }


  return num;
}

function roll() {

  $('.dice').removeClass('red robber');

  var tObj = {}
  
  var r1 = retRandArr();
  var r2 = retRandArr();

  var r1Disp = '';
  var r2Disp = '';
  
  var t = r1[0]+r2[0];
  rolls.push(t);
  $("#rollCount").html(rolls.length);

  var contDiv = "<div class='container'><div class='cube'>";
  var diceSpan = "<span class='diceify'>";
  var eSpan = "</span>";
  var eDiv = "</div></div>";

  for (var i = 0; i < r1.length; i++) {
    r1Disp += diceSpan;
    r1Disp += r1[i];
    r1Disp += eSpan;
  }

  for (var i = 0; i < r2.length; i++) {
    r2Disp += diceSpan;
    r2Disp += r2[i];
    r2Disp += eSpan;
  }

  $('.dice').fadeOut().delay(200).queue(function() {

    $('.dice').html(contDiv+r1Disp+eDiv + contDiv+r2Disp+eDiv + "&nbsp;");
    $('.dice').fadeIn();

    function callback(){
      return function(){
        count(rolls);
        $('.dice').append(t);

          if (t == 6 || t == 8) {
            $('.dice').addClass('red').removeClass('robber');
          } else if (t == 7) {
            $('.dice').addClass('robber').removeClass('red');
          } else if (t == 12) {
            console.log();
            $('.earthQuake').show().delay(2000).queue(function() {
              $(this).hide();
              $(this).dequeue();
            });
          } else {
            $('.dice').removeClass('red robber');
          }
  
      }
    }

    setTimeout(callback(), 1200);

    $(this).dequeue();
  });
  
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
    
  for (prop in result) {
  
    for (i=0; i <= 12; i++) {
      percentageData[i] = result[i];
    }
    
  }
  
  
  refreshChart();
} 

function refreshChart() {
  console.log(percentageData);
  
  var barChartData = {
  labels : ["2","3","4","5","6","7","8","9","10","11","12"],
  datasets : [
    {
      fillColor : "#669900",
      strokeColor : "#fff",
      data : percentageData.slice(2)
    },
    {
      fillColor : "#cc3333",
      strokeColor : "#fff",
      data : [2.78,5.56,8.33,11.11,13.89,16.67,13.89,11.11,8.33,5.56,2.78]            
    }
  ]
}
  
  var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData,{scaleFontSize:30, animation:false});

}

$(document).ready(function() {
  var w = $(window).width();
  var h = $(window).height();
  var diceAreaHeight = $(".dice").outerHeight(true);
  var buttonAreaHeight = $("button").outerHeight(true);


  $("body").append('<canvas id="canvas" width="' + w*.75 + '" height="' + (h-(diceAreaHeight+buttonAreaHeight)-20) + '"></canvas>')
  $("#canvas").height(h-(diceAreaHeight+buttonAreaHeight));
  $("#canvas").width(50);

});

function newGame() {

  var r = confirm("Start a new game?");
  
  if (r == true) {
    location.reload();
  } else { 
      
  }
  
}