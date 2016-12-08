(function () {
    'use strict';

    angular
        .module('app.organization')
        .factory('Organization', Organization);

    /* @ngInject */
    function Organization ($q, $http, Remote) {
        return {
            getBySlug: getBySlug
            , getRepos: getRepos
        };

        function getBySlug (slug) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/orgs/' + slug))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }

        function getRepos (slug) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/orgs/' + slug + '/repos'))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }
    }
}());
