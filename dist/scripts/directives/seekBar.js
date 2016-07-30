(function() {
    function seekBar($document) {
        
        //Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
         };
         
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { 
                onChange: '&'
            },
            link: function(scope, element, attributes){
                //Holds the value of the seek bar, such as the currently playing song time or the current volume. Default value is 0.
                scope.value = 0;
                
                //Holds the maximum value of the song and volume seek bars. Default value is 100.
                scope.max = 100;
                
                //Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
 
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                //A function that calculates a percent based on the value and maximum value of a seek bar.
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                //Returns the width of the seek bar fill element based on the calculated percent.
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                //Returns the location of the seek bar thumb element based on the calculated percent.
                scope.thumbStyle = function() {
                    return {left: percentString()};
                }
                
                //Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                //Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb.
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
                
            }
            
        };
     }
  
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();