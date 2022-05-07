$(function () {

    var container = $('#container');
    var plane = $('#plane');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');
 
  
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var plane_left = parseInt(plane.css('left'));
    var plane_height = parseInt(plane.height());
    var speed = 10;

    var goUp=false;
    var scoreUpdate=false;
    var gameOver=false;

    var theGame=setInterval(function(){

        if(Condition(plane,pole_1)||Condition(plane,pole_2)|| parseInt(plane.css("top"))<=0||parseInt(plane.css("bottom"))<=0){
            stopGame();
        }else{

        
        var polelivePostion = parseInt(pole.css("right"));

        if(polelivePostion>container_width-plane_left){
            if(scoreUpdate===false){
                  score.text(parseInt(score.text())+1);
                  scoreUpdate=true
            }
          
        }

        if(polelivePostion>container_width){
            var newHeight=parseInt(Math.random()*100);

            pole_1.css("height",pole_initial_height+newHeight);
            pole_2.css("height",pole_initial_height-newHeight);

            speed=speed+1;
            speed_span.text(speed);
            scoreUpdate=false;

            polelivePostion=pole_initial_position;
        }

        pole.css('right',polelivePostion+speed);

        if(goUp==false){
            go_down();
           
        }
    }

    },40);

   $(document).on('keydown',function(e){
      if(e.keyCode==32 && goUp==false && gameOver===false){
          goUp=setInterval(up,50);
         }
   });

   $(document).on('keyup',function(e){
    if(e.keyCode==32){
       clearInterval(goUp);
       goUp=false;
       }
 });

 restart_btn.click(function(){
     location.reload();
 });

 function stopGame(){
     clearInterval(theGame);
     gameOver=true;
     restart_btn.slideDown();
 }
    function go_down(){
        plane.css("top",parseInt(plane.css("top"))+5);
    }

    function up(){
        plane.css("top",parseInt(plane.css("top"))-10);
    }

    function Condition($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



}); 
