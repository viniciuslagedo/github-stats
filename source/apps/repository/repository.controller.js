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
        vm.contributors = []
        vm.commits = {
            labels: []
            , datas: []
            , series: []
        }

        activate();

        function activate () {
            Repository.getByFullName("mundipagg/" + paramName)
                .then(populateRepository)
                .catch(showError);

            Repository.getContributors("mundipagg/" + paramName)
                .then(populateContributors)
                .catch(showError);

            Repository.getCommits("mundipagg/" + paramName)
                .then(populateCommits)
                .catch(showError);
        }

        function populateRepository (_repository) {
            vm.repository = _repository;
        }

        function populateContributors (_contributors) {
            vm.contributors = _contributors;
        }

        function populateCommits (_commits) {
            var
                commits = _commits.reverse()
                , labels = []
                , datas = []
                , count = 1
            ;

            angular.forEach(commits, function(commit, key) {
                var
                    date = moment(commit.commit.author.date).format('MMM/YYYY')
                ;
                if (labels.length > 0) {
                    if (labels[labels.length - 1] == date){
                        count = count + 1;
                        datas[datas.length - 1] = count;
                    } else {
                        count = 1;
                        datas.push(count);
                        labels.push(date);
                    }
                } else {
                    labels.push(date);
                    datas.push(count);
                }
            });

            vm.commits.labels = labels;
            vm.commits.datas = [datas];
        }

        function showError (e) {
            console.error(e);
            alert('Um erro inesperado aconteceu !');
        }
    }
}());
