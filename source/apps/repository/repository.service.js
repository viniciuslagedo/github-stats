(function () {
    'use strict';

    angular
        .module('app.repository')
        .factory('Repository', Repository);

    /* @ngInject */
    function Repository ($q, $http, Remote) {
        return {
            getByFullName: getByFullName
        };

        function getByFullName (fullName) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/repos/' + fullName))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }
    }
}());
