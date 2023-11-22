document.addEventListener('DOMContentLoaded', function () {
  // Get reference to the form elements using their IDs
  var signInForm = document.getElementById('signInForm');
  var changePasswordForm = document.getElementById('changePasswordForm');
  var showPasswordCheckbox = document.getElementById('showPassword');
  var showChangePasswordCheckbox = document.getElementById('showChangePassword');

  // Add event listener to the Show Password checkbox for Sign In
  showPasswordCheckbox.addEventListener('change', function () {
    var password = document.getElementById('signInPassword');
    password.type = showPasswordCheckbox.checked ? 'text' : 'password';
  });

  // Add event listener to the Show Password checkbox for Change Password
  showChangePasswordCheckbox.addEventListener('change', function () {
    var password = document.getElementById('changePasswordPassword');
    password.type = showChangePasswordCheckbox.checked ? 'text' : 'password';
  });

  // Add event listener to the Sign In form
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form
    var username = document.getElementById('signInUsername').value;
    var password = document.getElementById('signInPassword').value;

    // Perform sign in logic here
    /* 
    search username from database -> compare passwords -> if the same, then evaluate role and link to correct dashboard
                                                       -> if different, then say wrong password
    */
    // temp logic for navigation
    window.location.href = '../Main Dashboard page/MainDashboardStudent.html';
    //window.location.href = '../Main Dashboard page/MainDashboardProfessor.html';
    //window.location.href = '../Main Dashboard page/MainDashboardAdmin.html';
  });

  // Add event listener to the Change Password form
  changePasswordForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form
    var username = document.getElementById('changePasswordUsername').value;
    var password = document.getElementById('changePasswordPassword').value;

    // Perform your Change Password logic here
    /*
    search username from database -> change password
    */
  });
});