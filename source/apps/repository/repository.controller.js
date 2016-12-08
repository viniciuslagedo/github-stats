(function () {
    'use strict';

    angular
        .module('app.repository')
        .controller('RepositoryController', RepositoryController);

    /* @ngInject */
    function RepositoryController (Repository, $stateParams) {
        var
            vm = this
            , paramName = $stateParams.name
        ;

        vm.repository = {}

        activate();

        function activate () {
            Repository.getByFullName("mundipagg/" + paramName)
                .then(populateRepository)
                .catch(showError);
        }

        function populateRepository (_repository) {
            vm.repository = _repository;
        }

        function showError (e) {
            console.error(e);
            alert('Um erro inesperado aconteceu !');
        }
    }
}());
