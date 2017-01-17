var state = {
  size : [],
  winMes : [],
  items : []
};
var d = localStorage.getItem('game');
if (d){
  state = JSON.parse(localStorage.getItem('game'));
}

window.addEventListener('load', function() {

  //Ваш код будет здесь
  'use strict';
  var isStarted = false;
  var input = document.querySelector('.count');
  var btnGenerate = document.querySelector('.generateField');
  var btnStartNewGame = document.querySelector('.startNewGame');
  var errorMessage = document.querySelector('.error-message');
  var startGame = document.querySelector('.startGame');
  var mainGame = document.querySelector('.mainGame');
  var winnerMessage = document.querySelector('.winner-message');
  var row;
  var cell;
  var field = document.querySelector('.field');
  var i;
  var j;
  var nextMove;
  var cells;
  

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function clearData (){
    field = document.querySelector('.field');
      while (field.lastChild) {
        field.removeChild(field.lastChild);
      }
    startGame.style.display = 'inline-block';
    mainGame.style.display = 'none';
    localStorage.clear('game');
    state.winMes.length = 0;
    state.size.length = 0;
    state.items.length = 0;
  }



  function generateField(x) {
    winnerMessage.innerHTML = '';
    field = document.querySelector('.field');
    startGame.style.display = 'none';
    mainGame.style.display = 'inline';
    for (i = 0; i < x; i++) {
      row = document.createElement('div');
      row.className = 'row';
      field.appendChild(row);
      for (j = 0; j < x; j++) {
        cell = document.createElement('div');
        cell.className = 'cell';
        row.appendChild(cell);
      }
    }
    nextMove = 'x';
    cells = document.querySelectorAll('.cell');
    if (state.winMes[0]) {
      console.log(state.winMes[0]);
      winnerMessage.innerHTML = state.winMes[0];
    }
    for (i=0; i < state.items.length; i++){

      if (nextMove === 'x') {
        cells[state.items[i]].classList.add('x');
        nextMove = 'o';
      } else {
        cells[state.items[i]].classList.add('o');
        nextMove = 'x';
      }
    }



    btnStartNewGame.addEventListener('click', function startNewGameListener() {
      btnStartNewGame.removeEventListener('click', startNewGameListener);
      clearData();
    });
    if (!isStarted){
    field.addEventListener('click', clickOnFieldListener);
    }



    state.size.push(+x);
    function clickOnFieldListener (event) {
      isStarted = true;
      var clickedCell = event.target;


      if (clickedCell.classList.contains('x') || clickedCell.classList.contains('o')){
        return;
      }
      if (clickedCell.classList === field || clickedCell.classList === row){
        return;
      }

      if (nextMove === 'x') {
        clickedCell.classList.add('x');
        nextMove = 'o';
      } else {
        clickedCell.classList.add('o');
        nextMove = 'x';
      }



      var index;
      console.log (cells.length);
      index = Array.prototype.indexOf.call(cells, clickedCell);
        state.items.push(index);



      if (getWinner() === 'x'){
        winnerMessage.innerHTML = 'x-wins';
        field.removeEventListener('click', clickOnFieldListener);
        isStarted = false;
        state.winMes.push(winnerMessage.innerHTML);
      }

      if (getWinner() === 'o') {
        winnerMessage.innerHTML = 'o-wins';
        field.removeEventListener('click', clickOnFieldListener);
        isStarted = false;
        state.winMes.push(winnerMessage.innerHTML);
      }


      console.log (state.items);
      localStorage.setItem('game', JSON.stringify(state));
      console.log (localStorage.getItem('game'));

    }
  }


  function setBtnFieldSizeListener(event) {
    if (event.keyCode === 13) {
      setFieldSizeListener();
    }
  }


  function setFieldSizeListener() {
    errorMessage.innerHTML = '';
    if (input.value < 16 && input.value >= 5 && isNumber(input.value)) {
      // btnGenerate.removeEventListener('click', generateFieldListener);
      // input.removeEventListener('keydown', generateEnterListener);
      generateField(parseInt(input.value).toFixed(0));
    } else {
      errorMessage.innerHTML = 'Число маэ бути від 5 до 15';
    }
  }
    input.addEventListener('keydown', setBtnFieldSizeListener);
    btnGenerate.addEventListener('click', setFieldSizeListener);
    if (d){
      generateField(state.size[0]);
    }
});
