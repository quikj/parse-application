 angular.module('AppControllers', ['AppServices'])
        .controller('homeCtrl', function ($scope, $state, ParseHttpService) {
            $scope.stateInfo = $state.current;
            $scope.myName = "Gyasi Jordan";

            $scope.itemsList = [];
            $scope.inputItem = {
                value: "",
                name: "",
                room: ""
            };
            /*called when user clicks the ADD button*/
            $scope.addItem = function addItem() {
                var data = $scope.inputItem.value.split(",");
                if (data.length === 2) {
                    $scope.inputItem.name = data[0].trim();
                    $scope.inputItem.room = data[1].trim();

                    ParseHttpService.addObject($scope.inputItem)
                        .then(function itemSaved(_newItem) {
                            alert("Item Saved", _newItem.objectId);
                            $scope.inputItem = {}; //clear the inputItem object

                            return populateList(); //update the list

                        }, function errorSaving(_error) {
                            $scope.inputItem = {};
                        });
                }
            };
            $scope.editObject = function editObject(_object) {
                var data = null;
                var editedObject = {};
                var objectData = prompt("Please enter the updated information for:", _object.name);

                if (objectData !== null) {
                    data = objectData.split(",");
                }
                if (objectData && (data.length === 2)) {
                    editedObject.name = data[0].trim();
                    editedObject.room = data[1].trim();
                    editedObject.objectId = _object.objectId;

                    console.log(JSON.stringify(editedObject));
                    ParseHttpService.updateObject(editedObject)
                        .then(function itemUpdated(_updatedItem) {
                            alert("Item Updated " + _updatedItem.objectId)
                            return populateList();
                        }, function errorSaving(_error) {
                            alert("Error Editing Object " + _error)
                        });
                } else
                if (objectData !== null) {
                    alert("Invalid input " + objectData);

                }

            };
            $scope.deleteObject = function deleteObject(_objectId) {
                ParseHttpService.deleteObjectById(_objectId)
                    .then(function itemSaved(_deletedObject) {
                        alert("Item Deleted " + _deletedObject.objectId);

                        return populateList();

                    }, function errorDeleting(_error) {
                        alert("Error Deleting Object " + _objectId)
                    });
            };

            /*gets a list of items in Parse account*/
            function populateList() {
                ParseHttpService.getAllObjects().then(function (_listData) {
                    $scope.itemsList = _listData.results;
                });
            }
            /*calls the login fxn, shows which user logged in and gets the list from Parse*/
            ParseHttpService.login().then(function (_loggedInUser) {
                alert("User logged in " + _loggedInUser.username);
                return populateList();
            })
        })
        .controller('detailCtrl', function ($scope, $state, ParseHttpService) {
            $scope.stateInfo = $state.current;
            $scope.params = $state.params;

            ParseHttpService.getObjectByID($state.params.objectId).then (function(_data){
                console.log(_data);
                $scope.item = _data;
                $scope.name = $scope.item.name;
            })
        });
