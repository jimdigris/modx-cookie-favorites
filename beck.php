<?php

declare(strict_types=1);

/* - получение ID избранных товара из куки и передача их в плейсхолдер - start - */
/*
    1 - проверить наличие куки
    2 - если есть получить содержимое (ID), если нет вывести предупреждение
    3 - поместить содержимое в плесхолдер для обработки его в pdoPage (&resources=`[[+favoriteProducts]]`)
*/
(function ($modx) {
    class FavoriteProducts
    {
        private static $modx;
        private static $favoriteProducts = '0000';

        private static $placeholderNames = [
            'favoriteProducts' => 'favoriteProducts',
        ];
        private static $cookieNames = [
            'selectedProducts' => 'selected-products',
        ];
        private static $classNames = [
            'outputResult' => 'basic-column__text-none-result',
        ];

        // ! ---------

        public static function init($modx): void
        {
            self::$modx = $modx;                                                                    // * 1 - получить modx для взаимодействия
            self::getCookie();                                                                      // * 2 - найти и получить данные из куки
            self::setFavorites();                                                                   // * 3 - установить ИД избранных товаров в плпейсхолдер
        }

        private static function getCookie(): void                                                   // ! найти и получить данные из куки
        {
            $_COOKIE[self::$cookieNames['selectedProducts']]                                        // если куки найдены
                ? self::$favoriteProducts = $_COOKIE[self::$cookieNames['selectedProducts']]        // получить содержимое
                : self::displayNoItemsInFavorites();                                                // вывесли сообщение от отсутствии товаров
        }

        private static function setFavorites(): void                                                // ! установить ИД избранных товаров в плпейсхолдер
        {
            self::$modx->setPlaceholder(self::$placeholderNames['favoriteProducts'], self::$favoriteProducts);
        }

        private static function displayNoItemsInFavorites()                                         // ! вывести результат об отсутствии товаров в Избранном
        {
            echo "<div class='" . self::$classNames['outputResult'] . "'>В Избранном нет товаров.</div>";
        }
    }

    FavoriteProducts::init($modx);
})($modx);
/* - получение ID избранных товара из куки и передача их в плейсхолдер - end - */
