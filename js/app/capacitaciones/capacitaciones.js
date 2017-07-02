'use strict';

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig','dato','datosCuenta',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosCuenta) {
$scope.date = moment();
}]);
app.controller('CapacitacionesCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
        
    type3: 'info',
    text3: 'Capacitacion borrada con éxito',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Capacitacion agregada con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'capacitacion editada con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este consultor se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Tipo de capacitacion borrada con exito',
    title8: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
    
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';
    $scope.nacionalidades = ['V','E'];
  $scope.carga = function (){
    $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
      $scope.tiposCapacitaciones = resp.data.results;
    });
  };


  $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
    $scope.tiposCapacitaciones = resp.data.results;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };

 
  $scope.carga = function(){
    $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
      $scope.tiposCapacitaciones = resp.data.results;
    });
  };
 
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openConfirmBorrarCapacitacion = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarCapacitacion.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
       $scope.tiposCapacitaciones.splice($scope.tiposCapacitaciones.indexOf(item), 1);
        $scope.item = null;  
        // $scope.items = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.createTipoCapacitacion = function(){
    var tipoCapacitacion = {nombre: 'Nuevo tipo de capacitacion'};          
    tipoCapacitacion.nombre = $scope.checkItem(tipoCapacitacion, $scope.tiposCapacitaciones, 'nombre');
    tipoCapacitacion.idUsuario = MyService.data.idUsuario;
    $scope.tiposCapacitaciones.push(tipoCapacitacion);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteTipoCapacitacion = function(item){
    $http.delete('http://54.202.62.62:1346/tipoCapacitacion/'+item.id , item)
    $scope.tiposCapacitaciones.splice($scope.tiposCapacitaciones.indexOf(item), 1);
  };

  $scope.selectTipoCapacitacion = function(item){   
    MyService.data.tipoCapacitacion=item.nombre;
    angular.forEach($scope.tiposCapacitaciones, function(item) {
      item.selected = false;
    });
    $scope.tipoCapacitacion = item;
    $scope.tipoCapacitacion.selected = true;
    $scope.filter = item.nombre;
    $http.get('http://54.202.62.62:1346/capacitacion/').then(function (resp) {
      $scope.items = resp.data.results;
    //   // alert("aqui");
    //   //  for (var i = 0; i < $scope.items.length; ++i) {
    //   //   if(typeof($scope.items[i].tipoCapacitacion) == "undefined"){
    //   //   $scope.items[i].tipoCapacitacion="ODONTOLOGÍA GENERAL";
    //   // }
    // }    
      $scope.item = null;  
    });
  };



  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var primerNombre =item.primerNombre;
    var primerApellido =item.primerApellido;
    MyService.data.primerNombre = primerNombre;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });

    $scope.item = item;
    $scope.item.selected = true;

    $http.get('http://54.202.62.62:1346/capacitacion/').then(function (resp) {
      $scope.capacitaciones = resp.data.results;
     
      });
     var pas = item.id;
    $scope.capacitacionesFiltrados = $scope.capacitaciones.filter(function (capacitacion) {
      return (capacitacion.idcapacitacion == pas );
      });
    setTimeout(function() {}, 500);
    
  };

  

  $scope.deleteItem = function(item){
    $http.delete('http://54.202.62.62:1346/capacitacion/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'primerNombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteCapacitacion = function(capacitacion){
    $http.delete('http://54.202.62.62:1346/capacitacion/'+capacitacion.id , capacitacion)
    $scope.capacitacionesFiltrados.splice($scope.capacitaciones.indexOf(capacitacion), 1);
    $scope.capacitacion = $filter('orderBy')($scope.capacitaciones, 'nombres')[0];
    if($scope.capacitacion) $scope.capacitacion.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      avatar:'img/avatar.png',
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      idEstablecimiento: MyService.data.idEstablecimiento,
      nivel:2
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.tipoCapacitacion = MyService.data.tipoCapacitacion;
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
    $scope.tiposCapacitaciones = resp.data.results;
    }); 
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingTipoCapacitacion = function(item){
    item.editing = false;
    var tipoCapacitacionAct= {};
    MyService.data.idenTipoCapacitacion= item.id;
    tipoCapacitacionAct.nombre=item.nombre;
    tipoCapacitacionAct.idEstablecimiento=item.idEstablecimiento;
    tipoCapacitacionAct.idUsuario=item.idUsuario;
    tipoCapacitacionAct.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    tipoCapacitacionAct.selected=item.selected;
    tipoCapacitacionAct.editing=item.editing;
    if (MyService.data.idenTipoCapacitacion){
      $http.put('http://54.202.62.62:1346/tipoCapacitacion/'+MyService.data.idenTipoCapacitacion, tipoCapacitacionAct)
    }
    else {
      $http.post('http://54.202.62.62:1346/tipoCapacitacion/', tipoCapacitacionAct)
    }
  
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
 
  };


  $scope.doneEditingCapacitacion = function(item){
    var capacitacionAct = {};
    MyService.data.idenCapacitacion=item.id;
    

    capacitacionAct.primerNombre=item.primerNombre;
    capacitacionAct.segundoNombre=item.segundoNombre;
    capacitacionAct.primerApellido=item.primerApellido;
    capacitacionAct.segundoApellido=item.segundoApellido;
    capacitacionAct.nacionalidad=item.nacionalidad;

    capacitacionAct.fechaNacimiento=item.fechaNacimiento;
    capacitacionAct.sexo=item.sexo;
    capacitacionAct.estadoCivil=item.estadoCivil;
    capacitacionAct.cedula=item.cedula;
    
    capacitacionAct.cov=item.cov;
    capacitacionAct.msas=item.msas;

    capacitacionAct.universidadEgreso=item.universidadEgreso;
    capacitacionAct.anoDeEgreso=item.anoDeEgreso;

    capacitacionAct.tipoCapacitacion=item.tipoCapacitacion;
    capacitacionAct.anoDeEgresotipoCapacitacion=item.anoDeEgresotipoCapacitacion;
    capacitacionAct.universidadEgresotipoCapacitacion=item.universidadEgresotipoCapacitacion;

    capacitacionAct.cuentaI=item.cuentaI;
    capacitacionAct.cuentaF=item.cuentaF;
    // capacitacionAct.avatar='img/avatar.png';
    capacitacionAct.direccionTrabajo=item.direccionTrabajo;
    capacitacionAct.municipio=item.municipio;
    capacitacionAct.email=item.email;
    capacitacionAct.telefonoTrabajo=item.telefonoTrabajo;
    capacitacionAct.telefonoCelular=item.telefonoCelular;
 
    capacitacionAct.letra=item.letra;

    capacitacionAct.tipo=item.tipo;
    capacitacionAct.nivel=item.nivel;
    capacitacionAct.status=item.status;

    capacitacionAct.idUsuario=item.idUsuario;

    if (MyService.data.idenCapacitacion){
      $scope.pop4();
      $http.put('http://54.202.62.62:1346/capacitacion/'+MyService.data.idenCapacitacion , capacitacionAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://54.202.62.62:1346/capacitacion/', capacitacionAct)
    }
    $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
      $scope.tiposCapacitaciones = resp.data.results;
    });
    $http.get('http://54.202.62.62:1346/capacitacion/').then(function (resp) {
      $scope.app.states = resp.data.results;
    });
    // $scope.items = null;
    $scope.capacitaciones = null;
    // $scope.item=null;
    item.editing = false;
  };

}]);
