var drag = function(){
var sl = document.getElementsByClassName ("slider")[0],
    elem = document.getElementsByClassName ("dragme")[0],
    sad = document.getElementsByClassName ("sad")[0],
    sw = sad.offsetWidth, // ширина деда
    sh = sad.offsetHeight,
    rect = sad.getBoundingClientRect(), //возвращает размер элемента и его позицию относительно окна
    slRect = sl.getBoundingClientRect(),
    rectOffsetL = rect.left - slRect.left, //промешуток от деда до стенки слайдера
    rectOffsetT = slRect.top + rect.bottom, //промежуток от пола слайдера до деда
    mx = 0,
    my = 0, //преремещение мышью
    mxOffset = 0, //положение курсора
    myOffset = 0,
    ex = 0, //координаты элемента 
    ey = 0,  
    ew = elem.offsetWidth, //ширина элемента 
    eh = elem.offsetHeight, //высота элемента
    vx = 0, //перемещение в сторону 
    vy = 0, //перемещение вниз
    ww = sl.offsetWidth, //ширина окна слайдера
    wh = sl.offsetHeight, //высота окна
    tracking = false, //удерживание кнопки мыши
    raf = null; //requestAnimationFrame
   

function prefixCss( elem, prop, val ) {
     
            elem.style[  prop ] = val;
      
}


function setElemCoords( x, y ) {
  prefixCss( elem, 'transform', 'translate3d( ' + x + 'px, ' + y + 'px, 0) rotate(15deg)'  ); // добавление элементу координат
  elem.setAttribute( 'data-x', x );
  elem.setAttribute( 'data-y', y );
  ex = x;
  ey = y;
}

function checkBounds() { 
  

     if(ex + ew > rectOffsetL && ex + ew < rectOffsetL+sw   && ey + eh < rectOffsetT && ey + eh < rectOffsetT+sh) { //дед получил таблетку
                vy = -vy * 0.7;
                vy *= 0.99;
                vx = -vx * 0.7;
                vx *= 0.99;
                ey = rectOffsetT - eh;  
               
                sad.style.transition = 'opacity 1s';
                sad.style.opacity = '0';
                setTimeout(function(){ 
                    sad.style.opacity = '1';
                    
                    sad.setAttribute("src", "./img/happy.png");

                 }, 500);
               
                
                elem.style.display = 'none';
            }





  if( ex + ew > ww ) { //правая стенка
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.7;
      vy *= 0.99;
    }
    ex = ww - ew;    
  }
  
  if( ex < 0 ) { //левая стенка
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.7;
      vy *= 0.99;
    }
    ex = 0;    
  }
  
  if( ey + eh > wh ) { //низ
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = wh - eh;    
  }
  
  if( ey < 0 ) { //верх
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = 0;    
  }
}

function mousedowncb() { //начало перемещения мышью
  tracking = true;
  setElemCoords( ex, ey );
  mxOffset = mx - ex;
  myOffset = my - ey;
}

function mouseupcb() { //конец
  tracking = false;
}

function mousemovecb( e ) { //движение
  mx = e.clientX;
  my = e.clientY;
}


function touchstart(e){

   tracking = true;

}

function touchmove(e){

my = e.touches[0].clientY - eh;
mx = e.touches[0].clientX - ew;


}





function loop() {
  raf = requestAnimationFrame( loop );
  if( tracking ) {
    vx = ( mx - mxOffset - ex ) / 2;
    vy = ( my - myOffset - ey ) / 2;
  }
  vy += 0.9;
  vx *= 0.99;
  vy *= 0.99;
  ex += vx;
  ey += vy;
  
  checkBounds();
  
  setElemCoords( ex, ey );
}

 
  elem.addEventListener( 'mousedown', mousedowncb, false );
  window.addEventListener( 'mouseup', mouseupcb, false );
  window.addEventListener( 'mousemove', mousemovecb, false );
 
  elem.addEventListener( 'touchstart', touchstart, false );
  window.addEventListener( 'touchend', mouseupcb, false );
  window.addEventListener( 'touchmove', touchmove, false );



setElemCoords( ex, ey ); //начальные координаты таблетки

loop();
};





    var nums = function(){ 
    var input = document.querySelectorAll('input')[0], //слайдер на первом слайде
    input2 = document.querySelectorAll('input')[1], 
    numsLine = document.querySelectorAll('.num span p'),//цифры над слайдером
    found,
    val = input.value;
    input2.value = val;
    function slide(){
        val = input.value;
       

        input2.value = val;
       
        
        search();
   
    }

    function search(){ //поиск значения слайдера среди цифр над ним
          for (var i = 0; i < numsLine.length; i++) { 
                    if (numsLine[i].textContent == val) {
                        found = numsLine[i];
                         found.classList.add('active-num');
                            }
                            else{
                               rem = numsLine[i]; 
                               rem.classList.remove('active-num'); 
                            }
                    }
    }


    input.addEventListener( 'mousedown', slide, false );
    input.addEventListener( 'mousemove', slide, false );
     input.addEventListener( 'touchstart', slide, false );
    input.addEventListener( 'touchmove', slide, false );
    search();
};


var buttons = function(){
var btn = document.getElementsByClassName('sl1'); //кнопки

var  btnText ;
function focus(){ //добавить класс к кликнутой кнопке на первом слайде и аналогичной на втором

for (var i = 0; i < btn.length; i++){
    btn[i].addEventListener( 'click', function(){

    for (var i = 0; i < btn.length; i++){
        if(btn[i].classList.contains('push')){  
        btn[i].classList.remove('push'); //убирает класс. только 1 кнопка на слайде может быть активна
        }
    }

       
        btnText = this.innerText; 

        for (var i = 0; i < btn.length; i++){
                if(btn[i].innerText == btnText){
                console.log(btnText);
                btn[i].classList.add('push');
            }
        }

        if (this.innerText == "день"){          
dayVal = document.querySelector('input').value;
console.log('day ' + dayVal);
}
else if(this.innerText == "неделя"){
    weekVal = document.querySelector('input').value;
console.log('week ' + weekVal);
}
else{
    monthVal = document.querySelector('input').value;
console.log('month ' + monthVal);
}

    } );
}    

}

focus();

};


var carr = function(){ 

var slides = document.getElementsByClassName('slide'), //слайды
slideCount = slides.length,
i = 0,
right = document.getElementsByClassName("right")[0],
left = document.getElementsByClassName("left")[0];


slides[slideCount - 1].style.left = "-100%"; //последний слайд 
slides[0].style.zIndex = "19"; //первый слайд



function moveLeft() {
  i++; 
  if (i < slideCount) {

  slides[i].style.left = "0"; 
  slides[i-1].style.left = "-100%";  

  } else {
    i = 0; //возвращаемся к первому слайду
  
    slides[i].style.left = "0";
    slides[slideCount - 1].style.left = "-100%";
    
    
    //возврат слайдов 
    for (var x = 1; x < slideCount -1; x++) {
      
      slides[x].style.left = "100%";
    
    }
  }
  if (i === slideCount - 1) {
  
    slides[0].style.left = "100%";
  }
  if (i === slideCount - 2){
 
    slides[slideCount - 1].style.left = "100%";
  }   
}



function moveRight() {
  if (i > 0) { 
    i--; 
   
    slides[i + 1].style.left = "100%"; //двигает  слайд справа
    slides[i].style.left = "0"; 
   
  } else { 

    
    i = slideCount - 1; 
    
    slides[0].style.left = "100%"; 
    slides[i].style.left = "0"; 
    
    
    for (var x = 1; x < slides.length - 1; x++) {
      
      slides[x].style.left = "-100%"; 
     
    }
  }
  if (i ===  1) { 

    slides[0].style.left = "-100%";
    
  }
  if (i === 0) { 
    
    slides[slideCount - 1].style.left = "-100%";
  }
}




right.addEventListener( 'mousedown', moveRight, false );


left.addEventListener( 'mousedown', moveLeft, false );

};