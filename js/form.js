"use strict";

// Файл отвечает за валидацию формы объявления

(function () {

    // Задание 16   Задание 16   Задание 16   Задание 16   Задание 16   Задание 16   


    /* Проверка типа жилья */


    var selectType = document.querySelector('#type');
    /* тип жилья */
    var inputPrice = document.querySelector('#price');
    /* окно цены */
    var inputTitle = document.querySelector('#title');
    /* заголовок объявления */

    var showWrongSet = function (evt) {
        evt.target.style.border = '3px solid red';
    };

    inputTitle.addEventListener('invalid', function (evt) {
        showWrongSet(evt);
    });

    inputPrice.addEventListener('invalid', function (evt) {
        showWrongSet(evt);
    });

    selectType.addEventListener('change', function (evt) {
        checkFlat(evt);
    });

    var checkFlat = function () {
        switch (selectType.value) {
            case 'flat':
                inputPrice.setAttribute('min', '1000');
                inputPrice.setAttribute('placeholder', '1000');
                break;

            case 'bungalo':
                inputPrice.setAttribute('min', '0');
                inputPrice.setAttribute('placeholder', '0');
                break;

            case 'house':
                inputPrice.setAttribute('min', '5000');
                inputPrice.setAttribute('placeholder', '5000');
                break;

            case 'palace':
                inputPrice.setAttribute('min', '10000');
                inputPrice.setAttribute('placeholder', '10000');
                break;
        }
    };

    /* Проверка времени заезда */

    var timeIn = document.querySelector('#timein');
    /* время заезда */
    var timeOut = document.querySelector('#timeout');
    /* время выезда */

    timeIn.addEventListener('change', function (evt) {
        checkTimeIn(evt);
    });

    timeOut.addEventListener('change', function (evt) {
        checkTimeOut(evt);
    });

    var checkTimeIn = function () {
        timeOut.value = timeIn.value;
    };

    var checkTimeOut = function () {
        timeIn.value = timeOut.value;
    };

    /* Проверка гостей */

    var roomsQuantity = document.querySelector("#room_number");
    /* количество комнат */
    var guestsQuantity = document.querySelector("#capacity");
    /* количество гостей */
    guestsQuantity.value = '1';

    roomsQuantity.addEventListener('change', function (evt) {
        checkGuestsAndRooms(evt);
    });

    guestsQuantity.addEventListener('change', function (evt) {
        checkGuestsAndRooms(evt);
    });

    guestsQuantity.addEventListener('invalid', function (evt) {
        showWrongSet(evt);
    });

    var checkGuestsAndRooms = function () {
        if (roomsQuantity.value === '1' && !(guestsQuantity.value === '1')) {       /* 1 комната и не один гость */
            guestsQuantity.setCustomValidity('При одной комнате нужно указать одного гостя');
            console.log('atatta');
        } else if ((roomsQuantity.value === '2' && !(guestsQuantity.value === '1'))         /* 2 комнаты и не один и не два гостя */
            || (roomsQuantity.value === '2' && !(guestsQuantity.value === '2'))) {
            guestsQuantity.setCustomValidity('При двух комнатах нужно указать одного или двух гостей');
            console.log('atatta 23');
        } else if (roomsQuantity.value === '3' && (guestsQuantity.value === '0')) {     /* 3 комнаты и ни одного гостя */
            guestsQuantity.setCustomValidity('При трех комнатах нельзя использовать вариант \'не для гостей\'');
        } else if (roomsQuantity.value === '100' && !(guestsQuantity.value === '0')) {      /* 100 комнат и !не! нет гостей */
            guestsQuantity.setCustomValidity('Вам нельзя гостей :(');
        } else {
            guestsQuantity.setCustomValidity('');
        }
    };

})();