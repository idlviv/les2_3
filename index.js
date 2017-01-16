window.addEventListener('load', function () {
  //Ваш код будет здесь
  var input = document.querySelector('.count');
  var btnGenerate = document.querySelector('.generateField');
  var errorMessage = document.querySelector('.error-message');
  var field = document.querySelector('.field');
  var startGame = document.querySelector('.startGame');
  var mainGame = document.querySelector('.mainGame');
  var i;
  var j;
  var row;
  var cell;
  var xo;


  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function fieldGenerator (x){
    console.log (x);
    startGame.style.display = 'none';
    mainGame.style.display = 'inline';
    xo = 2;
    for (i = 0; i < x; i++){
      row = document.createElement('div');
      row.className = 'row';
      field.appendChild(row);
      for (j = 0; j < x; j++) {
        cell = document.createElement('div');
        if (xo % 2 === 0){
          cell.className = 'cell x';
        } else {
          cell.className = 'cell o';
        }
        row.appendChild(cell);
        xo = xo + 1;
      }
      if (x % 2 === 0){
        xo = xo + 1;
      }
    }
  }
  function btnGenerateListener(e) {
    errorMessage.innerHTML = '';
    if ((input.value < 16 && input.value >= 5) && isNumber(input.value)){
      fieldGenerator (parseInt(input.value).toFixed(0));
    } else {
      errorMessage.innerHTML = 'Число маэ бути від 5 до 15';
    }
  }
  input.addEventListener('keydown', function btnGenerateEnter(event) {
    if (event.keyCode === 13){
      btnGenerateListener();
    }
  });
  btnGenerate.addEventListener('click', btnGenerateListener);

});