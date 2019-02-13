'use strict';

var mapPins = document.querySelector('.map__pins');     /* поле для всех меток карты */
var mapPinMain = document.querySelector('.map__pin--main');     /* главная метка на карте */
var map = document.querySelector('.map');  
var fieldsets = document.querySelectorAll('.ad-form fieldset');     /* все поля под картой */
var mapFilterSelects = document.querySelectorAll('.map__filters select');     /* селекты фильтра сразу под картой */
var mapFilterFieldset = document.querySelector('.map__features');       /* фиелдсет фильтра сразу под картой */
var adForm = document.querySelector('.ad-form');
var adressInput = document.querySelector('.ad-form__element--wide input[name="address"]');

var similarMapCard = document.querySelector('template')
    .content
    .querySelector('.map__card');
var similarMapPin = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var generatedObjs = [];
var counterSteps = 8;

//      author      author      author      author      author      author

var avatars = [];

//      offer      offer      offer      offer      offer      offer      offer

var title = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var refreshType = {                 /* Что-бы потом легче выводить */
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
};
var checkinAndCheckout = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

//      функции      функции      функции      функции      функции      функции      функции

/* Получить случайное число */

var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

/* для создание массива avatars */

var createUrls = function (i) {
    return 'img/avatars/user0' + Number(i+1) + '.png';
};

for (var i = 0; i <= 7; i++) {
    avatars[i] = createUrls(i);
}

/* для заполнения массива features случайными элементами из featuresArr !без повторения! */

var toRecycleArr = function (newArr, oldArr) {
    var transitArr = oldArr.concat();           /* копировать массив, чтобы не изменять стырый */
    for (var i = 0; i <= getRandomNumber(0, oldArr.length - 1); i++) {          
        var random = getRandomNumber(0, transitArr.length - 1);                                            /* Как можно лучше? */
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};

/* для заполнения массива photos случайными элементами из photosArr !без повторения! */

var toSortArr = function (newArr, arr) {
    var transitArr = arr.concat();          /* копировать массив, чтобы не изменять стырый */
    for (var i = 0; i <= arr.length - 1; i++) {
        var random = getRandomNumber(0, transitArr.length - 1);  
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};

// Генерируем весь массив
/* Всё целиком */

var createWholeObj = function (arr) {
    for (var i = 0; i < counterSteps; i++) {
        generatedObjs[i] = {};
        generatedObjs[i].author = {};
        generatedObjs[i].offer = {};
        generatedObjs[i].location = {};
        var photos = [];
        var features = [];
        toRecycleArr(features, featuresArr);
        toSortArr(photos, photosArr);
        arr[i].author.avatar = avatars[i];
        arr[i].location.x = getRandomNumber(0, mapPins.clientWidth);
        arr[i].location.y = getRandomNumber(130, 630);
        arr[i].offer.title = title[i];
        arr[i].offer.adress = arr[i].location.x + ', ' + arr[i].location.y;
        arr[i].offer.price = getRandomNumber(1000, 1000000);
        arr[i].offer.type = typeArr[getRandomNumber(0, typeArr.length - 1)];
        arr[i].offer.rooms = getRandomNumber(1, 5);
        arr[i].offer.guests = getRandomNumber(1, 25);
        arr[i].offer.checkin = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
        arr[i].offer.checkout = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
        arr[i].offer.features = features;
        arr[i].offer.descrription = '';
        arr[i].offer.photos = photos;
    }
};
createWholeObj(generatedObjs);

/* Создание похожих меток из template */

var renderMapPin = function (obj, id) {
    var mapPin = similarMapPin.cloneNode(true);          /* все равно долбанутая */
    mapPin.style = 'left: ' + obj.location.x + 'px;' + 'top: ' + obj.location.y + 'px;';
    mapPin.querySelector('img').src = obj.author.avatar;
    mapPin.querySelector('img').alt = obj.offer.title;
    mapPin.dataset.offerId = id;        /* счетчик метки */

    return mapPin;
};

var renderMapCard = function (obj, id) {
    var fragmentImg = document.createDocumentFragment();        /* пустое ведро для фоток */
    var fragmentFeature = document.createDocumentFragment();        /* пустое ведро для особенностей */
    var mapCard = similarMapCard.cloneNode(true);    

    mapCard.querySelector('.popup__title').textContent = obj.offer.title;    
    mapCard.querySelector('.popup__text--address').textContent = obj.offer.adress;    
    mapCard.querySelector('.popup__text--price').textContent = obj.offer.price +'₽ /ночь';
    mapCard.querySelector('.popup__type').textContent = refreshType[obj.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    /* удаляем старые особенности из списка popup__features */
    var features = mapCard.querySelector('.popup__features');
    while (features.firstChild) {
        features.removeChild(features.firstChild);
    }
    /* наполняем popup__features новыми особенностями */
    for (var i = 0; i < obj.offer.features.length; i++) {
        var newFeature = document.createElement('li');
        newFeature.className = 'popup__feature popup__feature--' + obj.offer.features[i];
        fragmentFeature.appendChild(newFeature);
    }
    mapCard.querySelector('.popup__features').insertBefore(fragmentFeature, mapCard.querySelector('.popup__features').querySelector('.popup__feature'));
    mapCard.querySelector('.popup__description').textContent = obj.offer.description;
    /* удаляем старую фотку из popup__photos */
    mapCard.querySelector('.popup__photos').removeChild(mapCard.querySelector('.popup__photos').querySelector('.popup__photo'));
    /* наполняем popup__photos новыми фотками */
    for (var i = 0; i < 3; i++) {
        var newImg = document.createElement('img');
        newImg.width = 45;
        newImg.height = 40;
        newImg.alt = 'Фотография жилья';
        newImg.className = 'popup__photo';
        newImg.src = obj.offer.photos[i];
        fragmentImg.appendChild(newImg);
    }
    mapCard.querySelector('.popup__photos').appendChild(fragmentImg);
    mapCard.querySelector('img').src = obj.author.avatar;
    mapCard.dataset.offerId = id;       /* счетчик карточки */
    mapCard.querySelector('.popup__close').addEventListener('click', function (evt) {       /* обработчик закрытия */
        closeMapCard();
    });
    return mapCard;
};

/* Создаем пустое "ведро" (document fragment) и прикрепляем к нему объявление */

var fragmentCard = document.createDocumentFragment();

/* Прикрепляем фрагмент с объявлением к верстке до map__filters-container */

var createDOMCard = function (count, id) {
    fragmentCard.appendChild(renderMapCard(generatedObjs[count], id));
    map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));
};

/* Создаем пустое "ведро" (document fragment) и прикрепляем к нему метки */

var fragment = document.createDocumentFragment();
for (var i = 0; i < counterSteps; i++) {
    fragment.appendChild(renderMapPin(generatedObjs[i], i));
}

/* Прикрепляем фрагмент с метками к верстке */

var createDOMPins = function () {
    mapPins.appendChild(fragment);
};


// задание 4    задание 4    задание 4    задание 4    


/* Отключаем все поля на странице */

var getDisabledState = function () {
    for (var i = 0; i < fieldsets.length; i++) {   
        fieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < mapFilterSelects.length; i++) {
        mapFilterSelects[i].setAttribute('disabled', 'disabled');
        // mapFilters[i].querySelectorall()
    }
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    console.log('неактивное состояние, поля заблокированны');
};
getDisabledState();

/* Получение координат элемента на странице */

var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset + (mapPinMain.clientHeight + 22),
        left: box.left + pageXOffset + (mapPinMain.clientWidth / 2 + 0.5)
    };
};

/* Добавляем координаты в поле адреса */

var setCoordinats = function (elemIn, elemFrom) {
    elemIn.value =  getCoords(elemFrom).left + ', ' + getCoords(elemFrom).top;
};

setCoordinats(adressInput, mapPinMain);

/* Закрытие окна объявления */

var closeMapCard = function (evt) {
    var mapCard = map.querySelector('.map__card');
    map.removeChild(mapCard);
    map.querySelector('.clickedPin').classList.remove('clickedPin');    /* удаление класса на кликнутой метке */
};

/* Получить активное состояние карты */

var getActiveState = function (evt) {
    for (var i = 0; i < fieldsets.length; i ++) {
        fieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < mapFilterSelects.length; i ++) {
        mapFilterSelects[i].removeAttribute('disabled');
    }
    mapFilterFieldset.removeAttribute('disabled');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    createDOMPins();
    console.log('active state');
};

/* Обработчик на каждую метку на карте */

var addListenerToEveryPin = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
        pins[i].addEventListener('click', function (evt) {
            cardCreater(evt, pins);
        });
    }
};

/* Одна большая проверка на открытое объявление */

var cardCreater = function (evt, pins) {
    var clickedElem = evt.currentTarget;
     var offerId = clickedElem.dataset.offerId;
    var mapCard = map.querySelector('.map__card');
    if (!clickedElem.classList.contains('map__pin--main')) {
        if (!clickedElem.classList.contains('clickedPin') && mapCard) {
            console.log('эл-т не содержит класс, но открыто окно, удалить все, открыть новое окно');
            map.removeChild(mapCard);
            for (i = 0; i < pins.length; i++) {
                pin = pins[i];
                pin.classList.remove('clickedPin');
            }
            clickedElem.classList.add('clickedPin');
            createDOMCard(offerId);           
            
        } else if (clickedElem.classList.contains('clickedPin') && mapCard) {
            console.log('эл-т содержит класс, и открыто окно, удалить все');
            map.removeChild(mapCard);
            for (var i = 0; i < pins.length; i++) {
                var pin = pins[i];
                pin.classList.remove('clickedPin');
            }
        } else if (!clickedElem.classList.contains('clickedPin')) {
            console.log('эл-т не содержит класс, добаить, открыть окно');
            clickedElem.classList.add('clickedPin');
            createDOMCard(offerId);
        }
    }  
};

/* Повесить обработчик на главную метку */

mapPinMain.addEventListener('mouseup', function (evt) {    
    if (mapPinMain.classList.contains('clicked')) {
        console.log('already');
    } else {
        getActiveState(evt);
        addListenerToEveryPin();
        mapPinMain.classList.add('clicked');
    }
});

// Задание 16   Задание 16   Задание 16   Задание 16   Задание 16   Задание 16   


/* Проверка типа жилья */

var selectType = document.querySelector('#type');  /* тип жилья */
var inputPrice = document.querySelector('#price');  /* окно цены */
var inputTitle = document.querySelector('#title');  /* заголовок объявления */

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

var checkFlat = function (evt) {
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

var timeIn = document.querySelector('#timein');  /* время заезда */
var timeOut = document.querySelector('#timeout');  /* время выезда */

timeIn.addEventListener('change', function (evt) {
    checkTimeIn(evt);
});

timeOut.addEventListener('change', function (evt) {
    checkTimeOut(evt);
});

var checkTimeIn = function (evt) {
    timeOut.value = timeIn.value;
};

var checkTimeOut = function (evt) {
    timeIn.value = timeOut.value;
};

/* Проверка гостей */

var roomsQuantity = document.querySelector("#room_number");  /* количество комнта */
var guestsQuantity = document.querySelector("#capacity");  /* количество гостей */
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

var checkGuestsAndRooms = function (evt) {
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


// Задание 5        Задание 5        Задание 5        Задание 5        Задание 5        

/* Перетаскивание главной метки и установка адреса */

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

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';     /* изменяем положение в верстке */
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';   

        console.log(startCoords);
        setCoordinats(adressInput, mapPinMain);
        
        if (mapPinMain.offsetTop >= 635) {      /* если метка на 635 или ниже*/
            mapPinMain.style.top = '630px';
            getActiveState();
            map.removeEventListener('mousemove', onMouseMove);
        } else if (mapPinMain.offsetTop <= 125) {       /* если метка на 125 или выше */
            mapPinMain.style.top = '130px';
            getActiveState();
            map.removeEventListener('mousemove', onMouseMove);
        } 
    };

    var onMouseUp = function (upEvt) {          /* удаление обработчиков по отпусканию мышки */
        map.removeEventListener('mousemove', onMouseMove);
        map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
});


// весь алгоритм программы (условно)

/* 1 задаем все переменный и функции для создания всего объекта */
/* 2 генерируем из всего этого объект */
/* 3 создаем по шаблонам renderMapPin и renderMapCard метки на карте BarProp окно объявления */
/* 4 прикрепляем их renderMapCard верстке */
 
/* 5 переводим страницу при первом запуске в нективное состояние */
/* 6 создаем обработчики на разные сценарии взаимодействия */
/* 7 навешиваем обработчики на главную метку */
/* 8 проверяем все поля в форме объявления */



// заметки
/* епте как-то сложновато,
 в консоли браузера свойства объекта идут не в том порядке (location перед offer),
 если взять больше восьми объектов, будет беда
 title идет не в случайном порядке 
 А как потом убрать красную рамку с неправильных полей?*/
