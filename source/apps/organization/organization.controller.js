(function () {
    'use strict';

    angular
        .module('app.organization')
        .controller('OrganizationController', OrganizationController);

    /* @ngInject */
    function OrganizationController (Organization, $state) {
        var
            vm = this
        ;

        vm.organization = {}
        vm.repositories = []

        vm.goToDetails = goToDetails;

        activate();

        function activate () {
            Organization.getBySlug('mundipagg')
                .then(populateOrganization)
                .catch(showError);
        }

        function populateOrganization (_organization) {
            vm.organization = _organization;
            Organization.getRepos('mundipagg')
                .then(populateRepositories)
                .catch(showError);
        }

        function populateRepositories (_repositories) {
            vm.repositories = _repositories;
        }

        function showError (e) {
            console.error(e);
            alert('Um erro inesperado aconteceu !');
        }

        function goToDetails (name) {
            $state.go('repository', {name: name});
        }
    }
}());
