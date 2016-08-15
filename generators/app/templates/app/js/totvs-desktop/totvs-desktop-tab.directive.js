/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsDesktop
* @name totvsDesktopTab
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
        .directive('totvsDesktopTab', totvsDesktopTab);

    totvsDesktopTab.$inject = [];

    function totvsDesktopTab() {

        var directive = {
            template:
                '<div id="menu-topbar">' +
                    '<div class="btn-group pull-left" id="menu-tabs" role="group" aria-label="menu-tabs"> ' +<% if (singlePageApp) { %>
                        '<div class="btn btn-module btn-home" role="button"></div>' +<% } %><% if (tabPageApp) { %>
                        '<div class="btn btn-module" id="{{tab.name}}" title="{{tab.name}}" role="button" ' +
                            ' ng-repeat="tab in tTabs" ' +
                            ' ng-class="{\'active\':tab.active,\'btn-home\':tab.name===\'Home\'}"> ' +
                            '<span unselectable="on" class="module-title disable-select" ' +
                                ' ng-click="selectTab(tab)">{{tab.name}}</span> ' +
                            '<span class="module-close" ng-hide="tab.name===\'Home\' || !tab.onClose" ' +
                                ' ng-click="closeTab(tab)">&times;</span> ' +
                        '</div>' +<% } %>
                    '</div> ' +
                    '<div class="btn-group pull-right" id="menu-options"> ' +
                        '<button ng-repeat="option in tOptions" type="button" ' +
                            ' title="{{option.title}}" class="btn btn-{{option.icon}} hidden-xs" ' +
                            ' ng-click="option.action(option)"></button> ' +
                    '</div>' +
                '</div>',
            restrict: 'E',
            replace: true,
            scope: {<% if (tabPageApp) { %>
                tTabs: '=',<% } %>
                tOptions: '='
            }<% if (tabPageApp) { %>,
            link: link<% } %>
        };

        return directive;<% if (tabPageApp) { %>

        /**
        * @name link
        *
        * @description Função link da diretiva
        *
        * @param {object} scope Escopo da diretiva
        * @param {element} element Elemento da diretiva
        * @param {object} attrs Atributos do elemento da diretiva
        */
        function link(scope, element, attrs) {

            scope.selectTab = selectTab;
            scope.closeTab = closeTab;

            scope.$watchCollection('tTabs', updateSizeTabs, true);
            scope.$watch('tOptions', updateSizeTabs);


            function selectTab(tabSelected) {

                if (tabSelected.active) {
                    return;
                }

                if (tabSelected.onSelect) {
                    if (tabSelected.onSelect(tabSelected) === false) {
                        return;
                    }
                }

                angular.forEach(scope.tTabs, function (tab) {
                    tab.active = false;
                });

                tabSelected.active = true;
            }

            function closeTab(tab) {
                var index;

                if (tab.onClose) {
                    if (tab.onClose(tab) === false) {
                        return;
                    }
                }

                index = scope.tTabs.indexOf(tab);

                if (index <= 0) {
                    return;
                }

                if (tab.active) {
                    if (index < scope.tTabs.length - 1) {
                        selectTab(scope.tTabs[index + 1]);
                    } else {
                        selectTab(scope.tTabs[index - 1]);
                    }
                }

                scope.tTabs.splice(index, 1);
            }

            function updateSizeTabs() {
                var i,
                    len,
                    width,
                    btnWidth,
                    menuTabsButtons,
                    buttonsWidth,
                    tabWidth;

                btnWidth = 200;
                buttonsWidth = 0;

                tabWidth = element[0].clientWidth - element.find('#menu-options')[0].clientWidth - 41;

                // Calcula a largura total dos botões, considerando a largura máxima de 200 pixels e o botão de HOME.
                menuTabsButtons = element.find('#menu-tabs>.btn');
                buttonsWidth = (btnWidth * (menuTabsButtons.length - 1));

                for (i = 0, len = menuTabsButtons.length; i < len; i += 1) {
                    width = undefined;

                    if (i > 0) {
                        if (buttonsWidth > tabWidth) {
                            menuTabsButtons[i].style.width = (width = width || (tabWidth / (len - 1))) + 'px';
                        } else {
                            menuTabsButtons[i].style.width = btnWidth + 'px';
                        }
                    }
                }
            }

        }<% } %>
    }

}());
