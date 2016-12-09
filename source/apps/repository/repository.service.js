(function () {
    'use strict';

    angular
        .module('app.repository')
        .factory('Repository', Repository);

    /* @ngInject */
    function Repository ($q, $http, Remote) {
        return {
            getByFullName: getByFullName
            , getContributors: getContributors
            , getCommits: getCommits
        };

        function getByFullName (name) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/repos/' + name))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }

        function getContributors (name) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/repos/' + name + '/contributors'))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }

        function getCommits (name) {
            var deferred = $q.defer();

            $http.get(Remote.getApiUrl('/repos/' + name + '/commits'))
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }
    }
}());
