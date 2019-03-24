'use strict';

// Файл отвечает за взаимодействия с пользователем

(function () {

    window.map = {
        map: document.querySelector('.map'),
        adForm: document.querySelector('.ad-form'),    /* Большая форма объявления */
        /* как получить неактивное состоянии страницы */
        getDisabledState: function () {
            for (var i = 0; i < fieldsets.length; i++) {
                fieldsets[i].setAttribute('disabled', 'disabled');
            }
            for (i = 0; i < mapFilterSelects.length; i++) {
                mapFilterSelects[i].setAttribute('disabled', 'disabled');
            }
            mapFilterFieldset.setAttribute('disabled', 'disabled');
            window.map.map.classList.add('map--faded');
            window.map.adForm.classList.add('ad-form--disabled');
            mapPinMain.classList.remove('clicked');
            // window.cardAndPin.createDOMPins();      /* создаем метки по данным с сервера */
            console.log('неактивное состояние, поля заблокированны');
        },
        /* как добавить обработчик создания объявления на каждую метку на карте */
        addListenerToEveryPin: function () {
            var pins = document.querySelectorAll('.map__pin');
            for (var i = 0; i < pins.length; i++) {
                pins[i].addEventListener('click', function (evt) {
                    cardCreater(evt, pins);
                });
            }
        }
    };


    var mapPinMain = document.querySelector('.map__pin--main');    /* главная метка на карте */
    var fieldsets = document.querySelectorAll('.ad-form fieldset');    /* все поля под картой */
    var mapFilterSelects = document.querySelectorAll('.map__filters select');    /* селекты фильтра сразу под картой */
    var mapFilterFieldset = document.querySelector('.map__features');    /* фиелдсет фильтра сразу под картой */
    var adressInput = document.querySelector('.ad-form__element--wide input[name="address"]');
 

    /* делаем неактивное состояние */
    window.map.getDisabledState();

    /* как получить активное состояние карты */
    var getActiveState = function (evt) {
        for (var i = 0; i < fieldsets.length; i++) {
            fieldsets[i].removeAttribute('disabled');
        }
        for (i = 0; i < mapFilterSelects.length; i++) {
            mapFilterSelects[i].removeAttribute('disabled');
        }
        mapFilterFieldset.removeAttribute('disabled');
        window.map.map.classList.remove('map--faded');
        window.map.adForm.classList.remove('ad-form--disabled');
        window.cardAndPin.createDOMPins();      /* создаем метки по данным с сервера */
        console.log('активное состояние, все доступно');
    };

    /* как получить координаты элемента на странице */
    var getCoords = function (elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset + (mapPinMain.clientHeight + 22),
            left: box.left + pageXOffset + (mapPinMain.clientWidth / 2 + 0.5)
        };
    };

    /* как добавить координаты в поле адреса */
    var setCoordinats = function (elemIn, elemFrom) {
        elemIn.value = getCoords(elemFrom).left + ', ' + getCoords(elemFrom).top;
    };
    /* сразу добавляем координаты */
    setCoordinats(adressInput, mapPinMain);

    /* как показывать и проверять объявление */
    var cardCreater = function (evt, pins) {
        var clickedElem = evt.currentTarget;
        var offerId = clickedElem.dataset.offerId;
        var mapCard = window.map.map.querySelector('.map__card');
        if (!clickedElem.classList.contains('map__pin--main')) {
            if (!clickedElem.classList.contains('clickedPin') && mapCard) {
                console.log('эл-т не содержит класс, но открыто окно, удалить все, открыть новое окно');
                window.map.map.removeChild(mapCard);
                for (i = 0; i < pins.length; i++) {
                    pin = pins[i];
                    pin.classList.remove('clickedPin');
                }
                clickedElem.classList.add('clickedPin');
                window.cardAndPin.createDOMCard(offerId);
                console.log(offerId);

            } else if (clickedElem.classList.contains('clickedPin') && mapCard) {
                console.log('эл-т содержит класс, и открыто окно, удалить все');
                window.map.map.removeChild(mapCard);
                for (var i = 0; i < pins.length; i++) {
                    var pin = pins[i];
                    pin.classList.remove('clickedPin');
                }
                console.log(offerId);
            } else if (!clickedElem.classList.contains('clickedPin')) {
                console.log('эл-т не содержит класс, добаить, открыть окно');
                clickedElem.classList.add('clickedPin');
                window.cardAndPin.createDOMCard(offerId);
                console.log(offerId);
            }
        }
    };

    /* как добавить обработчик создания объявления на каждую метку на карте */
    // var addListenerToEveryPin = function () {
    //     var pins = document.querySelectorAll('.map__pin');
    //     for (var i = 0; i < pins.length; i++) {
    //         pins[i].addEventListener('click', function (evt) {
    //             cardCreater(evt, pins);
    //         });
    //     }
    // };

    /* добавляем обработчик на главную метку */
    mapPinMain.addEventListener('mouseup', function (evt) {
        if (mapPinMain.classList.contains('clicked')) {
            console.log('already');
        } else {
            getActiveState(evt);
            window.map.addListenerToEveryPin();
            mapPinMain.classList.add('clicked');
        }
    });
    
    /* добавляем обработчик перемещения метки (сразу с объявлением) */
    mapPinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
            /* изменяем положение в верстке */
            mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
            
            setCoordinats(adressInput, mapPinMain);

            if (mapPinMain.offsetTop >= 635) {      /* если метка на 635 или ниже*/
                mapPinMain.style.top = '630px';
                getActiveState();
                window.map.map.removeEventListener('mousemove', onMouseMove);
            } else if (mapPinMain.offsetTop <= 125) {       /* если метка на 125 или выше */
                mapPinMain.style.top = '130px';
                getActiveState();
                window.map.map.removeEventListener('mousemove', onMouseMove);
            }
        };

        var onMouseUp = function (upEvt) {          /* удаление обработчиков по отпусканию мышки */
            window.map.map.removeEventListener('mousemove', onMouseMove);
            window.map.map.removeEventListener('mouseup', onMouseUp);
        };

        window.map.map.addEventListener('mousemove', onMouseMove);
        window.map.map.addEventListener('mouseup', onMouseUp);
    });

})();

// весь алгоритм программы (условно)

/* 1 задаем все переменный и функции для создания всего объекта */
/* 2 генерируем из всего этого объект */
/* 3 создаем по шаблонам renderMapPin и renderMapCard метки на карте BarProp окно объявления */
/* 4 прикрепляем их renderMapCard верстке */
 
/* 5 переводим страницу при первом запуске в нективное состояние */
/* 6 создаем обработчики на разные сценарии взаимодействия */
/* 7 навешиваем обработчики на главную метку */
/* 8 проверяем все поля в форме объявления - form.js */



// заметки
/* епте как-то сложновато,
 в консоли браузера свойства объекта идут не в том порядке (location перед offer),
 если взять больше восьми объектов, будет беда
 title идет не в случайном порядке 
 А как потом убрать красную рамку с неправильных полей?
 как сбросить значение полей формы на стандартные?Г? */

