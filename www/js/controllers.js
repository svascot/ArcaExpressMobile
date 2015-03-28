angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function($scope, $http) {
    console.log('Doing login', $scope.loginData);

       $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        });
        
  };
}
)
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Mis reservas', id: 1 },
    { title: 'Editar mi perfil', id: 2 },
    { title: 'Recomendaciones para mi', id: 3 },
    { title: 'Mis compañeros de viaje', id: 4 },
    { title: 'Mis cupones', id: 5 }
  ];
})

.controller('ListCarsCtrl', function($scope,$http) {
$http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=5').
        success(function(data) {
            $scope.carros = data.listDep;
        });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
