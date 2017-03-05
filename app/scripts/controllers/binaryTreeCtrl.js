'use strict';

angular.module('myApp', ['ngMdIcons'])
        .controller('BinaryTreeController', [function () {
        var vm = this,
            newNodeValue,
            pointerNodeObj,
            nodeVal,
            bfsQueueObj,
            bfsList = [],
            selectedNodeObj,
            highestNodeValue,
            highestNodeParent;

        /**
      * @name init
      * @kind function
      *
      * @description
      * Initialize the controller when it is called
      */
        function init() {
            vm.tree = [new Node({nodeValue : ''})];
        }

        /**
      * @name Node
      * @kind function
      *
      * @description
      * Initialize the Node Object
      */
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

        /**
      * @name addNode
      * @kind function
      *
      * @description
      * to taake input from user
      */
        vm.addNode = function addNode() {
            pointerNodeObj = vm.tree[0];
            newNodeValue = parseInt(vm.addNodeValue);
            vm.addNodeValue = '';
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

        /**
      * @name insertNode
      * @kind function
      *
      * @description
      * to insert node into the tree
      */
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

        //Breadth first search alogirthm for searching a node.
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
            if (!pointerNode) { return; }
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

        /**
      * @name searchNode
      * @kind function
      *
      * @description
      * to search a  node into the tree
      */
        vm.searchNode = function() {
            if (Object.keys(vm.tree[0]).length) {
                bfsQueueObj = new Queue();
                bfsList = [];
                bfsQueueObj.empty();
                nodeVal = vm.tree[0].nodeValue;
                var nodeObj =  vm.tree[0];
                bfsSearch(nodeObj);
                var slicedBfsPath = bfsList.slice(0, bfsList.indexOf(parseInt(vm.searchNodeValue)) + 1);
                vm.searchNodePath = !slicedBfsPath.length ? 'No element found for given input' : slicedBfsPath;
                vm.searchNodeValue = '';
            }
        };

        /**
     * @name deleteNode
     * @kind function
     *
     * @description
     * to delete a node
     */
        vm.deleteNode = function deleteNode(prData, data) {
            //  case 0: if deleted node is a root node
            if (data.nodeValue === vm.tree[0].nodeValue && (!vm.tree[0].nodesR.length && !vm.tree[0].nodesL.length)) {
                vm.tree = [new Node({nodeValue : ''})];
                return;
            }

            var parentData, i = 0;
            while (i !== -1) {
                prData = prData.$parent;
                if (prData && prData.data) {
                    parentData = prData.data;
                    i = -1;
                } else {
                    parentData = vm.tree[0];
                    i = -1;
                }
            }
            var deletedNode = [];
            if (parentData.nodeValue === data.nodeValue) {
                deletedNode = vm.tree;
            }
            else if (parentData.nodesR.length && (parentData.nodesR[0].nodeValue == data.nodeValue)) {
                deletedNode = parentData.nodesR;
            } else {
                deletedNode = parentData.nodesL;
            }

            //case 1: if deleted node is a leaf node
            if (!deletedNode[0].nodesL.length && !deletedNode[0].nodesR.length) {
                if (parentData.nodesR.length && (parentData.nodesR[0].nodeValue == deletedNode[0].nodeValue)) {
                    parentData.nodesR = [];
                    return
                }
                parentData.nodesL = [];
            }

            //case 2: if deleted node has only left child
            if (deletedNode[0].nodesL.length && !deletedNode[0].nodesR.length) {
                deletedNode[0] = deletedNode[0].nodesL[0];
                return;
            }

            //case 3: if deleted node has only right child
            if (!deletedNode[0].nodesL.length && deletedNode[0].nodesR.length) {
                deletedNode[0] = deletedNode[0].nodesR[0];
                return;
            }

            //case 4: if deleted node has both left and right child
            if (deletedNode[0].nodesL.length && deletedNode[0].nodesR.length) {
                highestNodeParent = '';
                highestNodeValue = getHighestValueNode(deletedNode[0].nodesL);
                deletedNode[0].nodeValue = highestNodeValue;
                if (!highestNodeParent) {
                    var rightNode = deletedNode[0].nodesR;
                    deletedNode[0] = deletedNode[0].nodesL[0];
                    deletedNode[0].nodesR = rightNode;
                    return;
                }

                if (highestNodeParent.nodesR.length) {
                    highestNodeParent.nodesR = [];
                } else {
                    deletedNode[0].nodesL = highestNodeParent.nodesL;
                }
            }
        };

        // to get the node with heighest weight
        function getHighestValueNode(nodeObj) {
            if (nodeObj[0].nodesR.length && nodeObj[0].nodesL.length) {
                highestNodeParent = nodeObj[0];
                var newNodeObj = nodeObj[0].nodesR[0].nodeValue > nodeObj[0].nodesL[0].nodeValue ? nodeObj[0].nodesR : nodeObj[0].nodesL ;
                getHighestValueNode(newNodeObj);
            } else {
                highestNodeValue = nodeObj[0].nodeValue;
            }
            return highestNodeValue;
        };

        init();
    },
]);
