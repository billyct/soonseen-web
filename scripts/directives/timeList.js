'use strict';

angular.module('soonseen3App')
  .directive('timeList', function () {
    return {
      template: '<ul class="nav affix flipInX animate0 scrollbar scroll-y" style="height:100%;" data-spy="affix" data-offset-top="50"> '+
	      			'<li class="active"><a href="/home">今天</a></li>'+
					'<li><a href="/home/past/1">昨天</a></li>'+
					'<li><a href="/home/past/2">前天</a></li>'+
	      			'<li ng-repeat="day in days">'+
					    '<a href="/home/past/{{$index+3}}" class="media-mini text-muted">'+
					      '<strong class="h4">{{day.date}}</strong><br>'+
					      '<small class="label bg-light">{{day.month}}</small>'+
					    '</a>'+
					'</li>'+
				'</ul>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      	scope.days = new Array(7);
	    var today_unix = moment().unix();

	    for (var i = 0; i < scope.days.length; i++) {

	      var past = moment.unix(today_unix-86400*(i+3));

	      scope.days[i] = {
	        month : past.format('MMM'),
	        date : past.date(),
	      };
	    }

      }
    };
  });
