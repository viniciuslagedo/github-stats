(function () {
    'use strict';

    angular
        .module('app.repository')
        .config(routes);

    /* @ngInject */
    function routes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('repository', {
                url: 'repository/:name',
                templateUrl: '/apps/repository/repository.html',
                controller: 'RepositoryController as vm'
            });
    }
}());
