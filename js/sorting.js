'use strict';

// Файл отвечает за сортировку похожих объясвлений

(function () {
    
    window.sorting = {};
    window.sorting.mapPins = document.querySelector('.map__pins');
    
    var mapFilters = document.querySelector('.map__filters');
    
    // var roomsFilter = document.querySelector('#housing-rooms');
    // roomsFilter.addEventListener('change', function (evt) {
    //     getFiltredCards();
    // });
    
    
    setTimeout(function () {
        window.sorting.transitCards = window.cardAndPin.cards.concat();
        console.log(window.sorting.transitCards);
    }, 200);
    
    
    var getFiltredCards = function (evt) {
        var key = evt.target.name.substr(8);
        console.log(key);
        console.log(evt.target.name);
        // var filtredCards;
        // console.log('selectedValue ' + evt.target.value);
        if (evt.target.value === 'any') {
            return window.sorting.transitCards;
        } else {
            window.sorting.transitCards = window.cardAndPin.cards.filter(function (card) {
                console.log('arrValue ' + card.offer[key]);
                // console.log(evt.target.value);
                return card.offer[key] == evt.target.value;
            });
            for (var i = 0; i < window.sorting.transitCards.length; i++) {
                console.log('card ' + i + ', value ' + window.sorting.transitCards[i].offer[key]);
            }
        }
        console.log(window.sorting.transitCards);
        // return window.sorting.transitCards;
        // console.log(filtredCards);
        // for (var i = 0; i < filtredCards.length; i++) {            
        //     console.log('card ' + i + ', value ' + filtredCards[i].offer.rooms);
        // } 
    };

    var deleteDOMPins = function () {
        var allPins = document.querySelectorAll('.map__pin');
        var mainPin = document.querySelector('.map__pin--main');
        for (var i = 0; i < allPins.length; i++) {
            window.sorting.mapPins.removeChild(allPins[i]);
        }
        window.sorting.mapPins.appendChild(mainPin);
    };

    var onFilterHandler = function (evt) {
        // console.log(evt.target.value);
        // if (evt.target.classList.contains('map__checkbox')) {
        //     console.log(evt.target.checked);
        // }
    };
    

    mapFilters.addEventListener('change', function (evt) {
        // deleteDOMPins();
        onFilterHandler(evt);
        getFiltredCards(evt);        
    });

// .map__checkbox:checked + .map__feature


})();

// 