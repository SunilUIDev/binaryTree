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
    // var getRandom = function getRandom() {
    //     var randomNumber =  Math.floor(Math.random() * (20)) + 1;
    //     if (vm.testArray.includes(randomNumber)) {
    //         return getRandom();
    //     } else {
    //         return randomNumber;
    //     }
    // };
    //
    // vm.generateRandomValue = function generateRandomValue() {
    //     vm.randomValue = getRandom();
    //     vm.testArray.push(vm.randomValue);
    // };

    /**
     * @name addNodes
     * @kind function
     *
     * @description
     * to add a new node
     */
    vm.addNode = function addNode(dataNode) {
        vm.addNodes(dataNode);
    }

    /**
  * @name addNodes
  * @kind function
  *
  * @description
  * to add a new node
  */
    vm.addNodes = function addNodes(dataNode) {
        var val = dataNode;
        if (val <= vm.tree[0].nodeValue) {
            if (!vm.tree[0].nodesL.length) {
                vm.tree[0].nodesL = [];
                vm.tree[0].nodesL.push({nodeValue: val, nodesR: [], nodesL: []});
                // vm.tree[0].nodeValue = vm.tree[0].nodesL;
            } else {
                alert('can not add -->' + val);
            }
        } else {
            if (!vm.tree[0].nodesR.length) {
                vm.tree[0].nodesR = [];
                vm.tree[0].nodesR.push({nodeValue: val, nodesR: [], nodesL: []});
                // vm.tree[0].nodeValue = vm.tree[0].nodesR;
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
