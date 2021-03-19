
/*$(document).ready(function(){
  $('input#v_link').on('keydown', function(){
    var value = $(this).val();
    $('div#msg strong').html(value);
  });
});*/


function validate_video(){

var v_link, v_name, v_song;

var v_link = document.getElementById('v_link').value;
var v_name = document.getElementById('v_name').value;
var v_song = document.getElementById('v_song').value;
var v_description = document.getElementById('v_description').value;


  if(v_link === "" || v_name === "" || v_song === ""){
    document.getElementById('msg_err').innerHTML = `<strong class="text-danger">The link , artist name and name song are required! </strong>`
    return false;
  }
  else if(isNaN(v_link)){
    document.getElementById('msg_err').innerHTML = `<strong class="text-danger">The ID of Vimeo are only numbers! </strong>`
    console.log(v_link)
    return false;
  }
  else if(v_name.length>25){
    document.getElementById('msg_err').innerHTML = `<strong class="text-danger">The name than be less 26 characters! </strong>`
    return false;
  }
  else if(v_song.length>25){
    document.getElementById('msg_err').innerHTML = `<strong class="text-danger">The song than be less 26 characters! </strong>`
    return false;
  }
  else if(v_description.length>40){
    document.getElementById('msg_err').innerHTML = `<strong class="text-danger">The description than be less 41 characters! </strong>`
    return false;
  }


  document.getElementById('msg_suc').innerHTML =
    `
    <div class="alert alert-success alert-dismissible fade show" role="alert" >
      <strong>Great you added a new video!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert aria-label="Close></button>
    </div>
  `
  }
function validate_radio(){

var r_link, r_name, r_description;

var r_link = document.getElementById('r_link').value;
var r_name = document.getElementById('r_name').value;
var r_description = document.getElementById('r_description').value;


  if(r_link === "" || r_name === "" ){
    document.getElementById('msg_err_r').innerHTML = `<strong class="text-danger">The link end radio name  are required! </strong>`
    return false;
  }
  else if(r_name.length>25){
    document.getElementById('msg_err_r').innerHTML = `<strong class="text-danger">The name than be less 26 characters! </strong>`
    return false;
  }
  else if(r_description.length>40){
    document.getElementById('msg_err_r').innerHTML = `<strong class="text-danger">The description than be less 41 characters! </strong>`
    return false;
  }


  document.getElementById('msg_suc_r').innerHTML =
    `
    <div class="alert alert-success alert-dismissible fade show" role="alert" >
      <strong>Great you added a new Radio!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert aria-label="Close></button>
    </div>
  `
  }

function validate_register(){

  var user, email, c_email, password, c_password;

  var user = document.getElementById('user').value;
  var email = document.getElementById('email').value;
  var c_email = document.getElementById('c_email').value;
  var password = document.getElementById('password').value;
  var c_password = document.getElementById('c_password').value;

  exp = /\w+@\w+\.+[a-z]/;

  if(
      user === "" ||
      email === "" ||
      c_email === "" ||
      password === "" ||
      c_password === ""
  ){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">All inputs are required!</strong>
    `
    return false;
  }
  if(user.length>20){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">The user than be less 21 characters!</strong>
    `
    return false;
  }
  if(user.length<=2){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">The user must not be less than 3 characters!</strong>
    `
    return false;

  }
  if(password.length<=7){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">The password must not be less than 8 characters!</strong>
    `
    return false;

  }
  if(password.length>15){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">The password than be less 15 characters!</strong>
    `
    return false;
  }
  if(password != c_password ){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">Your password and conformation are not the same!</strong>
    `
    return false;

  }
  if(email != c_email ){
    document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">Your email and conformation are not the same!</strong>
    `
    return false;

  }
  if(!exp.test(email)){
     document.getElementById('err_register').innerHTML =
    `
    <strong class="text-danger">Your email is not valid!</strong>
    `
    return false;

  }



}

