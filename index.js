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
  }

  function generateField(x) {
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
    winnerMessage.innerHTML = '';
    btnStartNewGame.addEventListener('click', function startNewGameListener() {
      btnStartNewGame.removeEventListener('click', startNewGameListener);
      clearData();
    });
    if (!isStarted){
    field.addEventListener('click', clickOnFieldListener);
    }
    isStarted = true;


    function clickOnFieldListener (event) {
    var clickedCell = event.target.classList;

      if (clickedCell.contains('x') || clickedCell.contains('o')){
        return;
      }

      if (nextMove === 'x') {
        clickedCell.add('x');
        nextMove = 'o';
      } else {
        clickedCell.add('o');
        nextMove = 'x';
      }

      if (getWinner() === 'x'){
        winnerMessage.innerHTML = 'x-wins';
        field.removeEventListener('click', clickOnFieldListener);
        isStarted = false;
      }

      if (getWinner() === 'o') {
        winnerMessage.innerHTML = 'o-wins';
        field.removeEventListener('click', clickOnFieldListener);
        isStarted = false;
      }
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

});
