(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('Remote', Remote);

    /* @ngInject */
    function Remote () {
        var API_ROOT = 'https://api.github.com'
        return {
            getApiUrl: getApiUrl
        };

        function getApiUrl (resource) {
            return API_ROOT + resource;
        }
    }
}());
