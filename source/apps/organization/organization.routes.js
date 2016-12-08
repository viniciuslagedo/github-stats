(function () {
    'use strict';

    angular
        .module('app.organization')
        .config(routes);

    /* @ngInject */
    function routes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('organization', {
                url: '/',
                templateUrl: '/apps/organization/organization.html',
                controller: 'OrganizationController as vm'
            });

        $urlRouterProvider.otherwise('');
    }
}());
