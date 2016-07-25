/**
* @license TOTVS | <%= title %> v<%= version %>
* (c) 2015-2016 TOTVS S/A https://www.totvs.com
* License: Comercial
*/

/**
* @module totvsMenu
* @name totvsMenuPrograms
* @object factory
*
* @created <%= currentDate %> v<%= version %>
* @updated <%= currentDate %> v<%= version %>
*
* @requires totvs-menu.module
*
* @dependencies
*
* @description
*/

(function () {

    'use strict';

    angular
        .module('totvsMenu')
        .factory('totvsMenuPrograms', totvsMenuPrograms);

    totvsMenuPrograms.$inject = [];

    function totvsMenuPrograms() {

        var applications = [],
            programs = {},
            factory = {
                getMenuApplications: getMenuApplications,
                getProgramApplications: getProgramApplications
            };

        return factory;

        function getMenuApplications(callback) {
            // TODO: Get list of server
            if (applications.length === 0) {
                applications = GenerateMenuApplications();<% if (createCRUD || createDashboard) { %>

                applications.splice(0, 0,
                    new MenuApplication(999, 0, 'Demo', [
                        new MenuModule(999, 999, 'Samples')
                    ])
                );

                programs['999'] = [];<% } %><% if (createCRUD) { %>
                programs['999'].push(new Program(false, 'Customers', 'Sample of CRUD', 'Customers', '/customers', 2));<% } %><% if (createDashboard) { %>
                programs['999'].push(new Program(false, 'Dashboard', 'Sample of Dashboard', 'Dashboard', '/dashboard', 1));<% } %>
            }

            callback(applications);
        }

        function getProgramApplications(id, callback) {
            // TODO: Get list of server
            if (!programs[id]) {
                programs[id] = GeneratePrograms(id);
            }

            callback(programs[id]);
        }

    }

    // ********************************************************************
    // Function - Simulation
    // ********************************************************************

    function GenerateMenuApplications() {
        var i,
            max = 0,
            menuApplications = [];

        max = Math.floor((Math.random() * 10) + 5);

        for (i = 1; i <= max; i++) {
            menuApplications.push(new MenuApplication(
                i,
                i,
                'Application #' + i,
                GenerateMenuModules(i)
            ));
        }

        return menuApplications;
    }

    function MenuApplication(id, seq, application, modules) {
        this.id = id || 1;
        this.seq = seq || 1;
        this.application = application || '[application]';
        this.modules = modules || [];
    }

    function GenerateMenuModules(app) {
        var i,
            max = 0,
            menuModules = [];

        max = Math.floor((Math.random() * 5) + 1);

        for (i = 1; i <= max; i++) {
            menuModules.push(new MenuModule(
                app + '.' + i,
                app + '.' + i,
                'Modulo #' + app + '.' + i
            ));
        }

        return menuModules;
    }

    function MenuModule(id, seq, module) {
        this.id = id || 1;
        this.seq = seq || 1;
        this.module = module || '[module]';
    }

    function GeneratePrograms(id) {
        var i,
            max = 0,
            programs = [];

        max = Math.floor((Math.random() * 30) + 40);

        for (i = 1; i <= max; i ++) {
            programs.push(new Program(
                Boolean(Math.floor(Math.random() * 2)),
                'Programa #' + i,
                'Programa #' + id + '.' + i,
                'Modulo #' + id,
                '/',
                Math.floor((Math.random() * 4) + 1)
            ));
        }

        return programs;
    }

    function Program(favorite, program, description, module, url, type) {
        this.favorite = favorite;
        this.program = program || '[program]';
        this.description = description || '[description]';
        this.module = module || '[module]';
        this.url = url || '/';
        this.type = type || 1;
    }

}());
