(function($){
  $(document).ready(function() {
    var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    $.ajax({
       type: 'GET',
        url: 'http://genesischurch.onthecity.org/plaza/events?format=json',
        async: false,
        jsonpCallback: 'jQuery18306948731462471187_1380242275378',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(events) {
            var data_array = [];
            for(var i=0; i<events.length; i++) {
                data_array.push(events[i]['global_event']);
            }
            $.each(data_array, function( index, event ) {
                var d = new Date(event.starting_at);
                var a_p;
                var curr_hour = d.getHours();
                if (curr_hour < 12)
                   {
                   a_p = "AM";
                   }
                else
                   {
                   a_p = "PM";
                   }
                if (curr_hour == 0)
                   {
                   curr_hour = 12;
                   }
                if (curr_hour > 12)
                   {
                   curr_hour = curr_hour - 12;
                   }

                var curr_min = d.getMinutes();

                curr_min = curr_min + "";

                if (curr_min.length == 1)
                   {
                   curr_min = "0" + curr_min;
                   }
                $('ul#city-events').append('<li><a href="'+event.short_url+'" target="_blank">'+event.title+'</a><ul><li><i class="icon-calendar"></i> '+ d_names[d.getDay()] + ', ' + m_names[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' @ ' + curr_hour + ':' + curr_min + a_p+'</li></ul></li>');
            });
        },
        error: function(e) {
           console.log(e.message);
        }
    });
  });
})(jQuery);
