/* global angular:true */
(function debugWapper(angular){
  'use strict';

  var
    // Change this boolean value to enable or disable debug
    DEBUG = true,

    // Returns the style to be given to the module name with a random color in
    // a pre-fixed color scale (MIN/MAX)
    pickColorStyle = function (){
      var
        MIN = 3750777,
        MAX = 15190932,
        rnd = Math.floor(Math.random() * (MAX - MIN) + MIN),
        color = '#' + rnd.toString(16); // converts to color hex

      return ('color:' + color + ';font-weight:bold;');
    };


  angular.module('debug', [])

    .constant('DEBUG', DEBUG)

    .factory('debugService', [
      'DEBUG',
      '$location',
      '$log',
      function (DEBUG, $location, $log){
        // checks that the debug param has the value 'true'
        var hasDebugQuerystring = ($location.search().debug === 'true');

        return function debugScope(moduleName){
          var colorStyle;

          if (hasDebugQuerystring || DEBUG){
            // Outside the debugClousure, will stay the same for each module
            colorStyle = pickColorStyle();

            return function debugClousure(){
              // Prepends module name and formatting to log message (arguments)
              var entry = [
                  '%c[' + moduleName + ']',
                  colorStyle
                ].concat(Array.prototype.slice.call(arguments));

              // calls the native $log.debug with the augmented arguments
              $log.debug.apply($log, entry);
            };
          }

          // nothing will be done if debug was disabled
          return angular.noop;
        };
      }
  ]);
}(angular));
