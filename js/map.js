var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
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

var title = [                                                       /* норм */
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];                /* норм */
var refreshType = {
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

map.classList.remove('map--faded');

/* Создание похожих меток из template */

var renderMapPin = function (obj) {
    var mapPin = similarMapPin.cloneNode(true);          /* все равно долбанутая */
    mapPin.style = 'left: ' + obj.location.x + 'px;' +
        'top: ' + obj.location.y + 'px;';
    mapPin.querySelector('img').src = obj.author.avatar;
    mapPin.querySelector('img').alt = obj.offer.title;
    
    return mapPin;
};

var renderMapCard = function (obj) {
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
    return mapCard;
};

/* Создаем пустое "ведро" (document fragment) и прикрепляем к нему объявление */

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderMapCard(generatedObjs[0]));

/* Прикрепляем фрагмент с объявлением к верстке до map__filters-container */

var createDOMCard = function (count) {
    map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));
};

/* Создаем пустое "ведро" (document fragment) и прикрепляем к нему метки */

var fragment = document.createDocumentFragment();
for (var i = 0; i < counterSteps; i++) {
    fragment.appendChild(renderMapPin(generatedObjs[i]));
}

/* Прикрепляем фрагмент с метками к верстке */

var createDOMPins = function () {
    mapPins.appendChild(fragment);
};

createDOMPins();
createDOMCard(0);


// заметки
 /* епте как-то сложновато,
 в консоли браузера свойства объекта идут не в том порядке (location перед offer),
 если взять больше восьми объектов, будет беда
 title идет не в случайном порядке */