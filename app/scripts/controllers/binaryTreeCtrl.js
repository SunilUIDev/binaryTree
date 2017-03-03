'use strict';
angular.module('myApp', ['ngMdIcons'])
        .controller('BinaryTreeController', [function () {
        var vm = this,
            newNodeValue,
            pointerNodeObj,
            nodeVal,
            bfsQueueObj,
            bfsList = [],
            selectedNodeObj;

        /**
      * @name init
      * @kind function
      *
      * @description
      * Initialize the controller when it is called
      */
        function init() {
            vm.testArray = [];
            vm.tree = [new Node({nodeValue : ''})];
        }

        function Node(param) {
            this.nodeValue = param.nodeValue;
            this.nodesR = [];
            this.nodesL = [];
        }

        Node.prototype.insertLeft = function(nodeObj) {
            this.nodesL.push(nodeObj);
        };

        Node.prototype.insertRight = function(nodeObj) {
            this.nodesR.push(nodeObj);
        };

        var Queue = function() {
            this.items = [];
        };
        // var queueObj = new Queue();
        Queue.prototype.enqueue = function(obj) {
            this.items.push(obj);
        };
        Queue.prototype.dequeue = function() {
            return this.items.shift();
        };
        Queue.prototype.isEmpty = function() {
            return this.items.length === 0;
        };
        Queue.prototype.getQueue = function() {
            return this.item;
        };
        Queue.prototype.empty = function() {
            this.items = [];
        };

        vm.addNode = function addNode() {
            pointerNodeObj = vm.tree[0];
            newNodeValue = parseInt(vm.addNodeValue);
            if (!vm.tree[0].nodeValue) {
                vm.tree[0].nodeValue = newNodeValue;
                return;
            }

            var nodeObj = new Node({nodeValue : newNodeValue});
            while (newNodeValue !== null) {
                if (pointerNodeObj.nodeValue === newNodeValue) {
                    alert('Value already exist in the node');
                    return;
                }
                insertNode(nodeObj);
            }
        };

        var insertNode = function(nodeObj) {
            if (newNodeValue < pointerNodeObj.nodeValue) {
                if (!pointerNodeObj.nodesL.length) {
                    pointerNodeObj.insertLeft(nodeObj);
                    newNodeValue = null;
                } else {
                    pointerNodeObj = pointerNodeObj.nodesL[0];
                }
            } else if (newNodeValue > pointerNodeObj.nodeValue) {
                if (!pointerNodeObj.nodesR.length) {
                    pointerNodeObj.insertRight(nodeObj);
                    newNodeValue = null;
                } else {
                    pointerNodeObj = pointerNodeObj.nodesR[0];
                }
            }
        };

        var bfsSearch = function(searchNode) {
            bfsQueueObj.enqueue(searchNode.nodeValue);
            processBFS(searchNode);
        };
        var processBFS = function(nodeObj) {
            var pointerNode = nodeObj;
            if (pointerNode.nodesL[0] && pointerNode.nodesR[0]) {
                if (pointerNode.nodesL[0].nodeValue < pointerNode.nodesR[0].nodeValue) {
                    bfsQueueObj.enqueue(pointerNode.nodesL[0].nodeValue);
                    bfsQueueObj.enqueue(pointerNode.nodesR[0].nodeValue);
                } else if (pointerNode.nodesL[0].nodeValue > pointerNode.nodesR[0].nodeValue) {
                    bfsQueueObj.enqueue(pointerNode.nodesR[0].nodeValue);
                    bfsQueueObj.enqueue(pointerNode.nodesL[0].nodeValue);
                }
            } else if (pointerNode.nodesL[0]) {
                bfsQueueObj.enqueue(pointerNode.nodesL[0].nodeValue);
            } else if (pointerNode.nodesR[0]) {
                bfsQueueObj.enqueue(pointerNode.nodesR[0].nodeValue);
            }
            if (!bfsQueueObj.items.length) {
                return;
            }
            if (bfsList.indexOf(bfsQueueObj.items[0]) === -1) {
                bfsList.push(bfsQueueObj.dequeue());
            }
            nodeVal = bfsQueueObj.items[0];
            pointerNode = getNodeObjByNodeVal(vm.tree[0]);
            processBFS(pointerNode);
        };

        var getNodeObjByNodeVal = function(obj) {
            if (obj && obj.nodesL[0]) {
                if (obj.nodesL[0].nodeValue === nodeVal) {
                    selectedNodeObj = obj.nodesL[0];
                } else {
                    getNodeObjByNodeVal(obj.nodesL[0]);
                }
            }
            if (obj && obj.nodesR[0]) {
                if (obj.nodesR[0].nodeValue === nodeVal) {
                    selectedNodeObj = obj.nodesR[0];
                } else {
                    getNodeObjByNodeVal(obj.nodesR[0]);
                }
            }
            return selectedNodeObj;
        };
        vm.searchNode = function() {
            if (Object.keys(vm.tree[0]).length) {
                bfsQueueObj = new Queue();
                bfsList = [];
                bfsQueueObj.empty();
                nodeVal = vm.tree[0].nodeValue;
                var nodeObj =  vm.tree[0];
                bfsSearch(nodeObj);
                vm.searchNodePath = bfsList.slice(0, bfsList.indexOf(parseInt(vm.searchNodeValue)) + 1);
                // console.log(bfsList.slice(0, bfsList.indexOf(parseInt(vm.searchNodeValue)) + 1));
            }
        };

        /**
      * @name deleteNode
      * @kind function
      *
      * @description
      * to delete a new node
      */
        vm.deleteNode = function deleteNode(prData, data) {
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
