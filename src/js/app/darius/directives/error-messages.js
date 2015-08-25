"use strict";

angular.module( 'darius' )
    .directive( 'errorMessages', errorMessagesDirective );

function errorMessagesDirective($rootScope, $timeout) {
    return {
        scope: { },
        replace: true,
        template: [
            '<div class="notification">',
            '<div ng-repeat="alert in alerts" id={{alert.id}}>',
            '   <button ng-click="close(alert.id)" class="close">&times;</button>',
            '   <span class="alertText">{{alert.message}}</span>',
            '</div>',
            '</div>'
        ].join( '' ),

        compile: function() {
            return function( scope ) {
                scope.alerts = [];
                var ids = 0;

                scope.close = function( id ) {
                    removeAlert( id );
                };

                $rootScope.$on( 'displayAlert', function( e, data ) {
                    data.id = 'alert' + ( ++ids );
                    if( data.closeAfter ) {
                        $timeout( function() {
                            removeAlert( data.id );
                        }, data.closeAfter );
                    }
                    scope.alerts.push( data );
                } );

                function removeAlert( id ) {
                    scope.alerts = _.reject( scope.alerts, {
                        id: id
                    } );
                }
            };
        }
    };
}
