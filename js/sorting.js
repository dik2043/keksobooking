'use strict';

// Файл отвечает за сортировку похожих объясвлений

(function () {
    
    window.sorting = {};
    window.sorting.mapPins = document.querySelector('.map__pins');  /* для удаления меток */
    /* фильтры под картой */
    var mapFilters = document.querySelector('.map__filters');   
    var typeFiled = document.getElementById('housing-type');
    var priceFiled = document.getElementById('housing-price');
    var roomsFiled = document.getElementById('housing-rooms');
    var guestsFiled = document.getElementById('housing-guests');
    var featuresFiled = document.getElementById('housing-features');
    var featuresLabels = featuresFiled.querySelectorAll('.map__feature');
    var featuresCheckbox = featuresFiled.querySelectorAll('.map__checkbox');
    

    var getFiltredCards = function () {
        
        /* огромный противный фильтр */
        
        window.sorting.transitCards = window.cardAndPin.cards.filter (function (card) {
            if (typeFiled.value === "any") {
                return card;
            }
            return card.offer.type == typeFiled.value;
        }).filter (function (card) {
            if (priceFiled.value === "any") {
                return card;
            } else if (priceFiled.value === "low" && card.offer.price < 10000) {
                return card;
            } else if (priceFiled.value === "middle" && card.offer.price < 50000 && card.offer.price >= 10000) {
                return card;
            } else if (priceFiled.value === "high" && card.offer.price >= 50000) {
                return card;
            }
        }).filter (function (card) {
            if (roomsFiled.value === "any") {
                return card;
            }
            return card.offer.rooms == roomsFiled.value;
        }).filter (function (card) {
            if (guestsFiled.value === "any") {
                return card;
            }
            return card.offer.guests == guestsFiled.value;
        })            
    };
 

    var deleteDOMPins = function () {
        var allPins = document.querySelectorAll('.map__pin');
        var mainPin = document.querySelector('.map__pin--main');
        for (var i = 0; i < allPins.length; i++) {
            window.sorting.mapPins.removeChild(allPins[i]);
        }
        window.sorting.mapPins.appendChild(mainPin);
    };
    

    mapFilters.addEventListener('change', function (evt) {
        deleteDOMPins();
        getFiltredCards();
        console.log(window.sorting.transitCards);
        for (var i = 0; i < window.sorting.transitCards.length; i++) {
            window.render.fragment.appendChild(window.render.renderMapPin(window.sorting.transitCards[i], i));
        }
        window.sorting.mapPins.appendChild(window.render.fragment);
        window.map.addListenerToEveryPin();
        var filtredFeatures = Array.from(featuresCheckbox).filter(function (value) { 
            if (value.checked) {
                return value;
            } 
        });
        console.log(filtredFeatures);
    });
    

})();