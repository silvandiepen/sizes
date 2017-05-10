// require('modernizr');

var angular = require('angular');

require('angular-ui-router');
require('angulartics');


var app = angular.module('sizes', [
	'ui.router',
	'angulartics',
	require('angulartics-google-analytics')
]);

require('./components');
require('./controllers');

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		'use strict';
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('root', {
				'abstract': true,
				views: {
					header: {
						templateUrl: 'sections/root/header.html',
						controller: 'HeaderController as headerCtrl'
					},
					content: {
						template: '<main ui-view></main>'
					},
					footer: {
						templateUrl: 'sections/root/footer.html',
						controller: 'FooterController as footerCtrl'
					}
				}
			})
			.state('home', {
				url: '/',
				parent: 'root',
				templateUrl: 'sections/home/home.html',
				controller: 'HomeController as homeCtrl'
			});

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);

app.run([
	'$rootScope',
	'$document',
	function($rootScope, $document) {
		'use strict';

		$document.on('keydown', function(e) {
			if (e.which === 8) {
				if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
					e.preventDefault();
				}
			}
		});
	}
]);
