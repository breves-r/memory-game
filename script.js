let cartas = [
    {id:1, img1:'img/android.png',img2:'img/cross.png'},
    {id:1, img1:'img/android.png', img2:'img/cross.png'},
    {id:2, img1:'img/chrome.png', img2:'img/cross.png'},
    {id:2, img1:'img/chrome.png', img2:'img/cross.png'},
    {id:3, img1:'img/facebook.png',img2:'img/cross.png'},
    {id:3, img1:'img/facebook.png', img2:'img/cross.png'},
    {id:4, img1:'img/firefox.png', img2:'img/cross.png'},
    {id:4, img1:'img/firefox.png', img2:'img/cross.png'},
    {id:5, img1:'img/html5.png', img2:'img/cross.png'},
    {id:5, img1:'img/html5.png', img2:'img/cross.png'},
    {id:6, img1:'img/twitter.png', img2:'img/cross.png'},
    {id:6, img1:'img/twitter.png', img2:'img/cross.png'},
    {id:7, img1:'img/windows.png',  img2:'img/cross.png'},
    {id:7, img1:'img/windows.png', img2:'img/cross.png'},
    {id:8, img1:'img/googleplus.png', img2:'img/cross.png'},
    {id:8, img1:'img/googleplus.png', img2:'img/cross.png'}
];

let tempoTotal;
let carta1;
let carta2;
let bloquearTabuleiro = false;
let cartaVirada = false;
let pares = [];
let tempos = [];

$(document).ready(function (){
    mostrarCartas();
    mostrarTempo();
    $("#iniciarGame").click(function(){    
      $("#iniciarGame").attr('disabled', true);
      criarTabuleiro();
    });
});

function mostrarCartas(){
    $("#board").show();
    
    card = "";
    cartas.forEach(element => {   
        card += "<div id='"+element.id+"' class='cards'>";
        card += "<div class='frente2'>";
        card += "<img src='"+element.img1+"'/>";
        card += "</div>";                    
        card += "</div>";        
    });
    $("#board").html(card);
}

function updateTimer(){
    let tempo = parseInt($("#timer").html());
    $("#timer").html(++tempo);
}

function criarTabuleiro(){
    $("#board").show();    
    cartas.sort(() => Math.random() - 0.5);
    
    card = "";
    cartas.forEach(element => {   
        card += "<div id='"+element.id+"' class='cards'>";
        card += "<div class='frente2'>";
        card += "<img src='"+element.img1+"'/>";
        card += "</div>";                    
        card += "</div>";        
    });
    $("#board").html(card);

    setTimeout('iniciar()',3000);
}

function iniciar(){
    tempoTotal = setInterval(updateTimer,1000);

    card = "";
    cartas.forEach(element => {   
      card += "<div id='"+element.id+"' class='cards'>";
      card += "<div class='frente'>";
      card += "<img src='"+element.img1+"'/>";
      card += "</div>";                
      card += "<div class='tras'>";
      card += "<img src='"+element.img2+"'/>";
      card += "</div>";                
      card += "</div>";        
    });

    $("#board").html(card);
      
    $(".cards").on("click", function(){
      if (bloquearTabuleiro) return;
      if (this === carta1) return;

      
      $(".tras", this).fadeOut('fast');
      $(".tras", this).slideUp();
      $(".frente", this).fadeIn('fast');
      $(".frente", this).slideDown();
      
      if (!cartaVirada) {
        carta1 = this;
        cartaVirada = true;
        return;
      }        
      
      carta2 = this;
      cartaVirada = false;
       
      checarPares();        
      })    
}      

function checarPares() {
    if (carta1.id === carta2.id) {
      bloquearCartas();
      pares.push(carta1,carta2);

      if(gameOver()){
        setTimeout(() => {
            alert(`Parabéns!! Tempo de jogo: ${parseInt($("#timer").html())}`);
            finalizar();
        }, 1000);
      }
      return;
    }
    desvirarCartas();
}
    
function bloquearCartas() {    
    $(carta1).off('click');
    $(carta2).off('click');
}
        
function desvirarCartas() {
    bloquearTabuleiro = true;

    setTimeout(() => {
        $(".frente", carta1).fadeOut('fast');
        $(".tras", carta1).fadeIn('fast');
        $(".frente", carta2).fadeOut('fast');
        $(".tras", carta2).fadeIn('fast');
        bloquearTabuleiro = false;
    }, 1500);
}    


const gameOver = () => {
  if (pares.length == cartas.length) {
      return true
  }
  return false
}

function finalizar(){
  salvarTempo();
  mostrarTempo();

  document.location.reload();
}

function salvarTempo(){
  let tp = parseInt($("#timer").html());
  tempos.push(tp);
  localStorage.setItem('tempos', JSON.stringify(tempos));
}

function mostrarTempo(){
  if (localStorage.tempos) {
      tempos = JSON.parse(localStorage.getItem('tempos'))
      tempos.sort(function (a, b) {return a - b})
      $("#result").html(`${tempos[0]}`);
  } else {
      return
  }
}
