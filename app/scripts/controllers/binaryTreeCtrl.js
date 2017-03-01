angular.module('myApp', ['ngMdIcons']).controller('TreeController', ['$scope', function ($scope) {
    $scope.testArray = [];
    var getRandom = function () {
        var randomNumber =  Math.floor(Math.random() * (20)) + 1;
        if ($scope.testArray.includes(randomNumber)) {
            return getRandom();
        } else {
            return randomNumber;
        }
    };

    $scope.generateRandomValue = function () {
        $scope.randomValue = getRandom();
        $scope.testArray.push($scope.randomValue);
    };

    $scope.tree = [{nodeValue: '', nodesR: [], nodesL: []}];

    $scope.deleteAllNodes = function (prData, data) {
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

    $scope.addNodes = function (data) {
        $scope.generateRandomValue();
        var val = $scope.randomValue;
        if (val <= data.nodeValue) {
            if (!data.nodesL.length || data.nodesL[0].isDeleted) {
                data.nodesL = [];
                data.nodesL.push({nodeValue: val, nodesR: [], nodesL: []});
            } else {
                alert('can not add -->' + val);
            }
        } else {
            if (!data.nodesR.length || data.nodesR[0].isDeleted) {
                data.nodesR = [];
                data.nodesR.push({nodeValue: val, nodesR: [], nodesL: []});
            } else {
                alert('can not add --> ' + val);
            }
        }
    };

    var nodeArray = [];
    var nodeSearch = function (node) {
        if (node.nodesL.length) {
            nodeArray.push(node.nodesL[0].nodeValue);
            $scope.searchNodePath = nodeArray;
            if (node.nodesL[0].nodeValue === parseInt($scope.searchNodeValue)) {
                return;
            }

            return nodeSearch(node.nodesL[0]);
        } else if (node.nodesR.length) {
            nodeArray.push(node.nodesR[0].nodeValue);
            $scope.searchNodePath = nodeArray;
            if (node.nodesR[0].nodeValue === parseInt($scope.searchNodeValue)) {
                return;
            }

            return nodeSearch(node.nodesR[0]);
        } else {
            console.log('hi');
        }
    };

    $scope.searchNode = function () {
        if (Object.keys($scope.tree[0]).length) {
            nodeSearch($scope.tree[0]);
        }
    };
},
]);
