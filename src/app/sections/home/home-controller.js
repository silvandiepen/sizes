require('angular').module('sizes')
	.controller('HomeController', ['$scope', '$sce', function($scope, $sce) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		angular.extend($scope, {
			screen: {
				url: null,
			},
			sizes: [{
				name: 'iPhone 7',
				width: 750,
				height: 1334,
				zoom: 2
			}, {
				name: 'Base design',
				width: 1920,
				height: 1080,
				zoom: 1
			}]
		});

		$scope.list = [];
		$scope.text = 'http://localhost:3000';
		$scope.submit = function() {
			if ($scope.text) {
				$scope.screen.url = $sce.trustAsResourceUrl(this.text);
        $scope.$applyAsync();
        self.renewiFrames();
			}
		};

    self.getSize = function getSize(el) {
      var rect = el.getBoundingClientRect(),
          parentRect = el.offsetParent.getBoundingClientRect();
      return {
        bottom: parentRect.bottom - rect.bottom,
        height: rect.height,
        left: rect.left - parentRect.left,
        right: parentRect.right - rect.right,
        top: rect.top - parentRect.top,
        width: rect.width
      };
    };

    $scope.setLeft = function setLeft(){
      var sizes;
      var lastEl = { left: 0, width: 0 };
      var screens = document.querySelectorAll('.screen');
      [].forEach.call(screens,function(screen,i){
        sizes = self.getSize(screen);
        screens[i].style.left = (lastEl.left + lastEl.width) + 'px';
        lastEl.left = sizes.left;
        lastEl.width = sizes.width;
        console.log(screens[i]);
        console.log(lastEl);
      });
    };

    setTimeout(function(){
      $scope.setLeft();
    },1000);

    self.renewiFrames = function renewiFrames(){
      var iframes = document.querySelectorAll('iframe');
      [].forEach.call(iframes, function(iframe) {
        // do whatever
        self.loadiFrame(iframe);
      });
    };


    self.loadiFrame = function loadiFrame(iframe){
      var url = iframe.src;
      var getData = function (data) {
          if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200) loadHTML(data.query.results.resources.content);
          else if (data && data.error && data.error.description) loadHTML(data.error.description);
          else loadHTML('Error: Cannot load ' + url);
      };
      var loadURL = function (src) {
          url = src;
          var script = document.createElement('script');
          script.src = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22' + encodeURIComponent(url) + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData';
          document.body.appendChild(script);
      };
      var loadHTML = function (html) {
          iframe.src = 'about:blank';
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(html.replace(/<head>/i, '<head><base href="' + url + '"><scr' + 'ipt>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { e.preventDefault(); parent.loadURL(e.target.href); } });</scr' + 'ipt>'));
          iframe.contentWindow.document.close();
      };
      loadURL(iframe.src);
    };




	}]);
