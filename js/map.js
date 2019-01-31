/* Получить случайное число */
var mapPin = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

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

var locationX = '300';  /* тестовое значение */
var locationY = '350';  /* тестовое значение */

var adress = locationX + ', ' + locationY;                           /* норм */
console.log('var adress - ' + adress);

var price = getRandomNumber(1000, 1000000);                          /* норм */
console.log('var price - ' + price);

var typeArr = ['palace', 'flat', 'house', 'bungalo'];                /* норм */
var type = typeArr[getRandomNumber(0, typeArr.length - 1)];
console.log('var type - ' + type);


var rooms = getRandomNumber(1, 5);                                   /* норм */
console.log('var rooms - ' + rooms);

var guests = getRandomNumber(1, 25);                                 /* норм */
console.log('var guests - ' + guests);

var checkinAndCheckout = ['12:00', '13:00', '14:00'];                /* норм */
var checkin = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
console.log('var checkin - ' + checkin);

var checout = checkinAndCheckout[getRandomNumber(0, checkinAndCheckout.length - 1)];
console.log('var checout - ' + checout);                             /* норм */

/* Заполняем массив features случайными элементами из featuresArr *без повторения* */

var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var features = [];
var toRecycleArr = function (newArr, oldArr) {
    for (var i = 0; i <= getRandomNumber(0, oldArr.length - 1); i++) {
        var transitArr = oldArr.concat();   /* копировать массив, чтобы не изменять стырый */
        var random = getRandomNumber(0, transitArr.length - 1);                                            /* Как можно лучше? */
        newArr[i] = transitArr[random];
        transitArr.splice(random, 1);
    }
};
toRecycleArr(features, featuresArr);                                 /* норм */        
console.log('var features - ' + features);

var description = '';
console.log('var description - ' + description);

var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
console.log('var photos - ' + photos);

//      location      location      location      location      location      location

/* Координаты метки на карте */

var x = getRandomNumber(1, mapPin.clientWidth);
var y = getRandomNumber(130, 630);
