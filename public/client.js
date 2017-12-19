// client-side js

$(function() {  

  $('form').submit(function(event) {
    event.preventDefault();
    var channel = $('input').val();
    $.post('/card-time?' + $.param({channel: channel}), function(req,res) {
      //$('<li></li>').text(res).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
