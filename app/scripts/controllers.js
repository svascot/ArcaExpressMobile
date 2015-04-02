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
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($rootScope) {
  $rootScope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('DisponiblesCtrl', function($scope,$rootScope) {
 
    console.log($rootScope.vehiculosDisponibles);

})

.controller('ReservarCtrl', function($scope, $http,$state,$rootScope,$q) {

 $scope.nuevaReserva ={};


   $scope.consultarDisponivilidad = function(){

    $scope.disponibles = $scope.serviceDisponivilidad();
    $scope.disponibles.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal);  
      
       $rootScope.vehiculosDisponibles = $scope.temporal;
    
       $state.go('app.disponibles',{disponibles:2});
    });

   };


  $scope.serviceDisponivilidad = function(){
      var q = $q.defer();
       var service =('http://www.mvvtech.com/arca/controller/tarea.php?op=34&fInicio='+$scope.nuevaReserva.fechaInicioNueva+
        '&fFin='+$scope.nuevaReserva.fechaFinNueva+'&horaInicio='+$scope.nuevaReserva.horaInicioNueva+'&horaFin='+$scope.nuevaReserva.horaFinNueva+
        '&numeroPersonas='+$scope.nuevaReserva.numeroPersonas);

       $http.get(service).
        success(function(data) {
          q.resolve(data.listDep);
          // $rootScope.vehiculosDisponibles.push(data.listDep);
        });  
              //$state.go('app.disponibles',{disponibles:2});
              return q.promise;
  };

    $scope.zeroFill = function( number, width ){
       width -= number.toString().length;
         if ( width > 0 )
           {
             return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
           }
            return number + ""; // always return a string
        };
           
    var selection = "";
    var i = 0;
    for(var i = 0; i < 23; i++){
         var j =$scope.zeroFill(i, 2);
        selection += "<option value='"+ j +"00'>"+ j + ":00" + "</option>";
        selection += "<option value='"+ j +"30'>"+ j + ":30" + "</option>";
    }
   angular.element(document.getElementById('horaP')).html(selection);
   angular.element(document.getElementById('horaR')).html(selection);

    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=25').
        success(function(data) {
            $scope.destinos = data.listDep;
    });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});




