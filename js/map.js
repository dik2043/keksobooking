
/* Получить случайное число */
var mapPin = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

var generatedObjs = [];
// var author = {'name':1};
// var generatedObjs = [
//     {
//         'author': {
//             'avatar': ,
//         },
//
//         'offer': {
//             'title': ,
//             'adress': , 
//             'price': ,
//             'type': ,
//             'rooms': ,
//             'guests': ,
//             'checkin': ,
//             'checkout': ,
//             'features': ,
//             'description': ,
//             'photos': 
//         },
//
//         'location': {
//             'x': ,
//             'y': 
//         }
//     }
// ];

var counterSteps = 8;

//      author      author      author      author      author      author

/* Создание массива avatars */

var avatars = [];

var createUrls = function (i) {
    return 'img/avatars/user0' + Number(i+1) + '.png';
};

for (var i = 0; i <= 7; i++) {
    avatars[i] = createUrls(i);
}
console.log('var avatars - ' + avatars);

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
console.log('var title - ' + title);

// var locationX = '300';  /* тестовое значение */
// var locationY = '350';  /* тестовое значение */

// var adress = locationX + ', ' + locationY;                           /* норм */
// console.log('var adress - ' + adress);

// var price = getRandomNumber(1000, 1000000);                          /* норм */
// console.log('var price - ' + price);

var typeArr = ['palace', 'flat', 'house', 'bungalo'];                /* норм */
var type = typeArr[getRandomNumber(0, typeArr.length - 1)];
console.log('var type - ' + type);


// var rooms = getRandomNumber(1, 5);                                   /* норм */
// console.log('var rooms - ' + rooms);

var guests = getRandomNumber(1, 25);                                 /* норм */
console.log('var guests - ' + guests);

var checkinAndCheckout = ['12:00', '13:00', '14:00'];                /* норм */
var checkin = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
console.log('var checkin - ' + checkin);

var checkout = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
console.log('var checout - ' + checkout);                             /* норм */

/* Заполняем массив features случайными элементами из featuresArr *без повторения* */

var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var toRecycleArr = function (newArr, oldArr) {
    var transitArr = oldArr.concat();           /* копировать массив, чтобы не изменять стырый */
    for (var i = 0; i <= getRandomNumber(0, oldArr.length - 1); i++) {          
        var random = getRandomNumber(0, transitArr.length - 1);                                            /* Как можно лучше? */
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};
// toRecycleArr(features, featuresArr);                           
// console.log('var features - ' + features);

// var description = '';
// console.log('var description - ' + description);

/* Заполняем массив photos случайными элементами из photosArr *без повторения* */

var photosArr = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var toSortArr = function (newArr, arr) {
    var transitArr = arr.concat();      /* копировать массив, чтобы не изменять стырый */
    for (var i = 0; i <= arr.length - 1; i++) {
        var random = getRandomNumber(0, transitArr.length - 1);  
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};

// console.log('var photos - ' + photos);

//      location      location      location      location      location      location

/* Координаты метки на карте */

// var x = getRandomNumber(1, mapPin.clientWidth);
// var y = getRandomNumber(130, 630);

/* Создаем wrapper */

var createWrapper = function () {
    for (var i = 0; i < counterSteps; i++) {
        var wrapper = {};
        generatedObjs[i] = wrapper;
    }
};

/* Создаем author */

var createAuthorInObj = function (arr) {
    for (var i = 0; i < counterSteps; i++) {
        var wrapper = generatedObjs[i];
        var author = {};
        wrapper[0] = author;
        author.avatar = arr[i];
    }
};

/* Создаем location */

var createLocationInObjs = function () {
    for (var i = 0; i < counterSteps; i++) {
        var wrapper = generatedObjs[i];
        var locationXY = {};
        wrapper[2] = locationXY;
        locationXY.x = getRandomNumber(0, mapPin.clientWidth);
        locationXY.y = getRandomNumber(130, 630);
    }
};

/* Создаем offer */

var createOfferInObj = function (title) {
    for (var i = 0; i < counterSteps; i++) {
        var photos = [];
        var features = [];
        toRecycleArr(features, featuresArr);
        toSortArr(photos, photosArr);
        var wrapper = generatedObjs[i];
        var offer = {};
        wrapper[1] = offer;
        offer.title = title[i];
        offer.adress = generatedObjs[i][2].x + ', ' + generatedObjs[i][2].y;
        offer.price = getRandomNumber(1000, 1000000);
        offer.type = typeArr[getRandomNumber(0, typeArr.length - 1)];
        offer.rooms = getRandomNumber(1, 5);
        offer.guests = getRandomNumber(1, 25);
        offer.checkin = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
        offer.checkout = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
        offer.features = features;
        offer.descrription = '';
        offer.photos = photos;
    }  
};

/* Все целиком */

var createWholeObj = function() {
    createWrapper();
    createAuthorInObj(avatars);
    createLocationInObjs();
    createOfferInObj(title);
}

createWholeObj();

console.log(generatedObjs);
