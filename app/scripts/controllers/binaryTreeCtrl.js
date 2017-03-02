'use strict';
angular.module('myApp', ['ngMdIcons']).controller('BinaryTreeController', [function () {
    var vm = this;

    /**
  * @name init
  * @kind function
  *
  * @description
  * Initialize the controller when it is called
  */
    function init() {
        vm.testArray = [];
        vm.tree = [{nodeValue: '', nodesR: [], nodesL: []}];
    }

    /**
  * @name getRandom
  * @kind function
  *
  * @description
  * to genrate random number
  */
    var getRandom = function getRandom() {
        var randomNumber =  Math.floor(Math.random() * (20)) + 1;
        if (vm.testArray.includes(randomNumber)) {
            return getRandom();
        } else {
            return randomNumber;
        }
    };

    vm.generateRandomValue = function generateRandomValue() {
        vm.randomValue = getRandom();
        vm.testArray.push(vm.randomValue);
    };

    /**
  * @name addNodes
  * @kind function
  *
  * @description
  * to add a new node
  */
    vm.addNodes = function addNodes(data) {
        vm.generateRandomValue();
        var val = vm.randomValue;
        if (val <= data.nodeValue) {
            if (!data.nodesL.length) {
                data.nodesL = [];
                data.nodesL.push({nodeValue: val, nodesR: [], nodesL: []});
            } else {
                alert('can not add -->' + val);
            }
        } else {
            if (!data.nodesR.length) {
                data.nodesR = [];
                data.nodesR.push({nodeValue: val, nodesR: [], nodesL: []});
            } else {
                alert('can not add --> ' + val);
            }
        }
    };

    vm.deleteAllNodes = function deleteAllNodes(prData, data) {
        var parentData;
        var i = 0;
        while (i !== -1) {
            prData = prData.$parent;
            if (prData.data) {
                parentData = prData.data;
                i = -1;
            }
        }

        if (parentData.nodesR.length && (parentData.nodesR[0].nodeValue == data.nodeValue)) {
            parentData.nodesR = [];
            return;
        }
        parentData.nodesL = [];
    };
    init();
},
]);
