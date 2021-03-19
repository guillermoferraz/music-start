$(document).ready(function(){
  $('#upload-video').hide();
  $('#upload-radio').hide();

  // video form

  $(document).on('click', '#btn-v-up', function(){
    $('#card-welcome').hide('slow');
    $('#upload-video').show('slow');
    $('#upload-radio').hide('slow');

  });
   $(document).on('click', '#btn-back', function(){
     $('#upload-radio').hide('slow');
     $('#card-welcome').show('slow');
     $('#upload-video').hide('slow');
   });

  //radio form

  $(document).on('click', '#btn-r-up', function(){
    $('#card-welcome').hide('slow');
    $('#upload-video').hide('slow');
    $('#upload-radio').show('slow');
  });
   $(document).on('click', '#btn-back', function(){
    $('#card-welcome').show('slow');
     $('#upload-radio').hide('slow');
     $('#upload-video').hide('slow');

   });


});


//logins


$(document).ready(function(){
  $('#content_register').hide();

  $(document).on('click','#register', function(){
    $('#content_login').hide('slow');
    $('#content_register').show('slow');
  });
  $(document).on('click','#login', function(){
    $('#content_register').hide('slow');
    $('#content_login').show('slow');
  })

})
