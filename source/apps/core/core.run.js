(function () {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* @ngInject */
    function run ($state) {
        $state.go('organization');
    }
}());
