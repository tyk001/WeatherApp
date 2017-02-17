(function() {
  'use strict';

  angular
    .module('myApp', [])
    .controller('myController', myController);

  myController.$inject = ['$http'];

  /* @ngInject */
  function myController($http) {
    var vm = this;
    var data = [];
    var givenCityName = '';
    vm.places = [];

    var inputLocation = '';
    activate();

    function activate() {
      vm.giveLocation = function(givenCityName) {
        console.log(givenCityName);
        $http.get("http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=bed337ec098ce69212a3df686ae03a98&q=" + givenCityName)
          .then(function(response) {
            vm.weatherData = response.data;
            console.log(vm.weatherData);

            vm.places.push({
              histLocation: vm.weatherData.name,
              histDateTime: Date.now(),
              histTemp: vm.weatherData.main.temp
            });

            console.log(vm.places);
          })
          .catch(function(error) {
            toastr.error('Im sorry but it didnt work out for you!!!', 'Error')
            console.log(error);
          })
      }
    }
  }
})();
