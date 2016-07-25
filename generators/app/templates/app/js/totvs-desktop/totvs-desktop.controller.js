/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsDesktop
* @name TotvsDesktopController
* @object controller
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-app.module
*
* @dependencies
*
* @description
*/

(function () {

    'use strict';

    angular
        .module('totvsDesktop')
        .controller('TotvsDesktopController', TotvsDesktopController);

    TotvsDesktopController.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        '$timeout',
        'TotvsDesktopViewService',
        'TotvsDesktopTabService'];

    function TotvsDesktopController(
        $rootScope, $scope, $state, $timeout, TotvsDesktopViewService, TotvsDesktopTabService) {

        // *********************************************************************************
		// *** Variables
		// *********************************************************************************

        var self = this,
            removeCurrentView = false;

        // *********************************************************************************
		// *** Public Properties and Methods
		// *********************************************************************************

        self.tabs = [];
        self.options = [];
        self.headerInformations = [];

        init();

        // *********************************************************************************
		// *** Controller Initialize
		// *********************************************************************************

        function init() {

            self.tabs = TotvsDesktopTabService.addTab('Home', 'home.blank', {}, undefined, tabOnSelect);

            self.options = [
                {title:'Config', action: optionAction, icon:'cfg'},
                {title:'Help', action: optionAction, icon:'hlp'},
                {title:'Logoff', action: optionAction, icon:'off'}
            ];

            // TODO: Load information of server
            self.headerInformations = [
                {label: 'TOTVS S/A', action: headerAction},
                {label: 'Usuário: Admin'},
                {label: 'TOTVS | HTML Framework - 12.1.12'}
            ];
        }

        // *********************************************************************************
		// *** Functions
		// *********************************************************************************

        function tabOnClose(tab) {
            if (tab.view) {
                TotvsDesktopViewService.removeViewByName(tab.view);

                removeCurrentView = tab.view === TotvsDesktopViewService.getViewNameCurrentState($state);
            }
        }

        function tabOnSelect(tab) {
            if (tab.state) {
                $state.go(tab.state, tab.params);
            }
        }

        function optionAction(option) {
            // TODO: Execute action for options
        }

        function headerAction(information) {
            // TODO: Execute action for header actions
        }

        // *********************************************************************************
		// *** Listeners Broadcast
		// *********************************************************************************

        // states
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // Salva o estado do controller que está sendo destruido
            if ($state.current.name && !removeCurrentView) {
                TotvsDesktopViewService.addViewState($state, $state.href(fromState, fromParams))
            }

            removeCurrentView = false;
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // Verifica se o controller que está sendo carregado tem cache
            var viewController;

            $timeout(function() {
                viewController =
                    TotvsDesktopViewService.getViewControllerState($state, $state.href(toState, toParams));
                // Avisa o controller que o state finalizou a carga
                $scope.$broadcast('$totvsViewServiceInit', viewController ? viewController.controller : undefined);

                self.tabs = TotvsDesktopTabService.addTab(
                    toState.title, toState.name, toParams,
                    TotvsDesktopViewService.getViewNameCurrentState($state),
                    tabOnSelect, tabOnClose);
            });

        });
    }

}());

