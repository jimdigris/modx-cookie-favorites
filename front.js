'use strict';

/* - добавление ID товара в избранное - start - */
/* 
    В верстке у каждой миниютюры товара есть кнопка "В избранное" с дата атрибутом = id товара
    1 - находим все такие кнопки по классу
    2 - при клике на кнопке - id товара добавляется (удаляется) в куки
    и в зависимости от состояния меняется внешний вид кнопки
*/
(() => {
    console.log(new Date().toLocaleString());

    class addToFavorites {
        static classNames = {
            btnToFavotites: 'btn-to-favorites',
            btnToFavotitesIco: 'product__basic-txtbuttuns-btn-ico',
            btnToFavotitesText: 'product__basic-txtbuttuns-btn-txt',
        }

        static dataAttributeNames = {
            productId: 'pid',
        }

        static cookieNames = {
            selectedProducts: 'selected-products',
        }

        // ! ---------------

        static init() {
            const btnsToFavorites = document.querySelectorAll(`.${this.classNames.btnToFavotites}`);        // * 1 - собрать все кн "В избранное"
            if (!btnsToFavorites.length) { return }

            const clickHandler = this.clickBtnToFavorites.bind(this);

            btnsToFavorites.forEach((btn) => {
                btn.addEventListener('click', clickHandler);                                                // * 2 - нажатие на кн "В избранное"
                this.toggleBtnToFavorites(btn);                                                             // * 3 - проверка на нахождение в избранном
            });
        }

        static clickBtnToFavorites(event) {                                                         // ! нажатие на кн "В избранное"
            const productId = event.currentTarget.dataset[this.dataAttributeNames.productId];       // получить ID товара
            this.toggleProductIdToCookie(productId);                                                // cохранить-удалить ИД товара в куки
            this.toggleBtnToFavorites(event.currentTarget)
        }

        static toggleProductIdToCookie(id) {                                                        // ! cохранить-удалить ИД товара в куки
            const cookieName = this.cookieNames.selectedProducts;
            const values = this.getCookie(cookieName)?.split(',') ?? [];
            const index = values.indexOf(id);

            index === -1 ? values.push(id) : values.splice(index, 1);                               // добавить, если нет. удалить, если есть

            if (values.length > 0) { this.setCookie(cookieName, values.join(','), 36500); }
            else { this.deleteCookie(cookieName); }
        }

        static setCookie(name, value, days = 36500) {                                               // ! записать куки
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
        }

        static getCookie(name) {                                                                    // ! получить куки
            const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        static deleteCookie(name) {                                                                 // ! удалить куки
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }

        static toggleBtnToFavorites(btn) {                                                          // ! смена статуса кнопки
            const cookieName = this.cookieNames.selectedProducts;
            const productId = btn.dataset[this.dataAttributeNames.productId];

            const values = (this.getCookie(cookieName)?.split(',') ?? []).map(id => id.trim()).filter(id => id);

            const btnToFavoritesText = btn.querySelector(`.${this.classNames.btnToFavotitesText}`);
            const btnToFavoritesIco = btn.querySelector(`.${this.classNames.btnToFavotitesIco}`);

            const isFavorite = values.includes(productId);

            btnToFavoritesIco.src = isFavorite ? '/assets/templates/v3/akb/img/icons/heart-2.svg' : '/assets/templates/v3/akb/img/icons/heart-1.svg';
            btnToFavoritesText.textContent = isFavorite ? 'В избранном' : 'В избранное';

            console.log(`Товар ${productId}: ${isFavorite ? "в избранном" : "НЕ в избранном"}`);
        }
    }

    addToFavorites.init();
})();
/* - добавление ID товара в избранное - end - */