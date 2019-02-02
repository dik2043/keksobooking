var mapPin = document.querySelector('.map__pins');
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
/* Создаем пустую структуру объекта */

var createEmptyStructure = function () {
    for (var i = 0; i < counterSteps; i++) {
        generatedObjs[i] = {};
        generatedObjs[i].author = {};
        generatedObjs[i].offer = {};
        generatedObjs[i].location = {};
    }
};

/* Заполняем author */

var fillAuthorInObj = function (arr, avatars) {
    for (var i = 0; i < counterSteps; i++) {
        arr[i].author.avatar = avatars[i];
    }
};

/* Заполняем location */

var fillLocationInObjs = function (arr) {
    for (var i = 0; i < counterSteps; i++) {
        arr[i].location.x = getRandomNumber(0, mapPin.clientWidth);
        arr[i].location.y = getRandomNumber(130, 630);
    }
};

/* Заполняем offer */

var fillOfferInObj = function (arr, title) {
    for (var i = 0; i < counterSteps; i++) {
        var photos = [];
        var features = [];
        toRecycleArr(features, featuresArr);
        toSortArr(photos, photosArr);
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
        arr[i].location.x = getRandomNumber(0, mapPin.clientWidth);
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

/* Все целиком */

var createObj = function() {
    createEmptyStructure();                         /* создает пустую структуру объекта */
    fillAuthorInObj(generatedObjs, avatars);        /* наполняет свойство author значениями avatar */
    fillLocationInObjs(generatedObjs);              /* наполняет свойство location значениями x, y */
    fillOfferInObj(generatedObjs, title);           /* наполняет свойство offer кучей всего */
};

createWholeObj(generatedObjs);
console.log(generatedObjs);


// заметки
 /* свойства объекта идут не в том порядке (location перед offer),
 title идет не в случайном порядке */