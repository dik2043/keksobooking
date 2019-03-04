"use strict";

// Файл отвечает за создание меток и объявлений и удаление объявления   

(function () {
    
    // var mapPins = document.querySelector('.map__pins');
    var similarMapCard = document.querySelector('template')
        .content
        .querySelector('.map__card');
    var similarMapPin = document.querySelector('template')
        .content
        .querySelector('.map__pin');
    

    /* как рендерить пин на карте */
    var renderMapPin = function (obj, id) {
        var mapPin = similarMapPin.cloneNode(true);          /* все равно долбанутая */
        mapPin.style = 'left: ' + obj.location.x + 'px;' + 'top: ' + obj.location.y + 'px;';
        mapPin.querySelector('img').src = obj.author.avatar;
        mapPin.querySelector('img').alt = obj.offer.title;
        mapPin.dataset.offerId = id;        /* счетчик метки */

        return mapPin;
    };

    /* как рендерить открытое объявление */
    var renderMapCard = function (obj, id) {
        var fragmentImg = document.createDocumentFragment();        /* пустое ведро для фоток */
        var fragmentFeature = document.createDocumentFragment();        /* пустое ведро для особенностей */
        var mapCard = similarMapCard.cloneNode(true);
        var refreshType = {                 /* Что-бы потом легче выводить на русском в объявление*/
            'flat': 'Квартира',
            'bungalo': 'Бунгало',
            'house': 'Дом',
            'palace': 'Дворец'
        };

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
        for (var i = 0; i < obj.offer.photos.length; i++) {
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
        mapCard.querySelector('.popup__close').addEventListener('click', function () {       /* обработчик закрытия */
            closeMapCard();
        });
        return mapCard;
    };

    /* как закрыть окно объявления */
    var closeMapCard = function () {
        var mapCard = window.map.map.querySelector('.map__card');
        window.map.map.removeChild(mapCard);
        window.map.map.querySelector('.clickedPin').classList.remove('clickedPin');    /* удаление класса на кликнутой метке */
    };
    
    
    // Отрисовываем метки по полученным данным 
    
    
var fragment = document.createDocumentFragment();
    window.backend.load(function (mapData) {
        window.cardAndPin = {
            // fragment: document.createDocumentFragment(),
            
            createDOMCard: function (count, id) {    /* mapCard - это параметр колбэка, данные с сервера */
                /* создаем пустое ведро и прикрепляем к нему объявление */
                var fragmentCard = document.createDocumentFragment();
                fragmentCard.appendChild(renderMapCard(mapData[count], id));
                /* прикрепляем фрагмент с объявлением к разметке до map__filters-container */
                window.map.map.insertBefore(fragmentCard, window.map.map.querySelector('.map__filters-container'));
            },

            createDOMPins: function () {
                /* прикрепляем фрагмент с метками к разметке */
                // var fragment = document.createDocumentFragment();
                for (var i = 0; i < mapData.length; i++) {
                    fragment.appendChild(renderMapPin(mapData[i], i));
                }
                window.sorting.mapPins.appendChild(fragment);
            },
            cards: mapData
        }
    });   
    
})();