/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsDesktop
* @name totvsDesktopHeader
* @object directive
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires
*
* @dependencies
*
* @description
*
* @restrict E
*/

(function () {

    'use strict';

    angular
        .module('totvsDesktop')
        .directive('totvsDesktopHeader', totvsDesktopHeader);

    totvsDesktopHeader.$inject = [];

    function totvsDesktopHeader() {

        var directive = {
            template:
                '<div id="menu-header" style="background: #e0e5eA;" class="hidden-xs">' +
                    '<h3 class="header-title">{{tTitle}}</h3>' +
                    '<div class="pull-right" id="menu-header-items">' +
                        '<span ng-repeat="information in tInformations" ' +
                            'ng-click="information.action(information)"' +
                            'class="header-item hidden-sm hidden-xs">{{information.label}}</span>' +
                    '</div>' +
                '</div>',
            restrict: 'E',
            replace: true,
            scope: {
                tTitle: '@',
                tInformations: '='
            }
        };

        return directive;
    }

}());
