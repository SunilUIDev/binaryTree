/**
* @name numbersOnly
* @kind directives
*
* @description
* directive to restrict user from entering text
*/
angular.module('myApp')
        .directive('numbersOnly', function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function (ctrl) {
                    function inputValue(val) {
                        if (val) {
                            var digits = val.replace(/[^0-9]/g, '');

                            if (digits !== val) {
                                ctrl.$setViewValue(digits);
                                ctrl.$render();
                            }
                            return parseInt(digits,10);
                        }
                        return undefined;
                    }
                    ctrl.$parsers.push(inputValue);
                }
            };
        });
