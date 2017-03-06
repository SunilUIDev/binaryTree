// to show a modal pop up
angular.module('myApp')
        .controller('modalController', function(close) {
        var vm = this;
        vm.close = function(result) {
            close(result);
        };
    });
