// Файл отвечает за загрузку и отображение фото в объевлении

(function () {
    var FILE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];
    var photoLoader = document.querySelector('.ad-form-header__input');
    var preview = document.querySelector('.ad-form-header__preview img');

    photoLoader.addEventListener('change', function (evt) {
        var file = photoLoader.files[0];
        var fileName = file.name.toLowerCase();
        
        var matches = FILE_TYPES.some(function (it) {   /*some начинает цикл по массиву FILE_TYPES 
                                                         (it - каждый элемент массива)*/
            console.log(it);
            return fileName.endsWith(it);         /*проверяет, заканчивается ли fileName на it (true или false)*/   
        });
        console.log(matches);
        
        if (matches) {
            var reader = new FileReader();  
            
            reader.addEventListener('load', function () {
                preview.src = reader.result;        /*по загрузке файла меняем путь картинки на картинку
                                                    в формате DataURL*/
            });
            
            reader.readAsDataURL(file);     /*переводим картинку в нужный формат*/
            
        } 
    })

})();