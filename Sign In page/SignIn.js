// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');
const { readUsersFile } = require('../Class Implementations/Users');


// Sign in authentication
const authenticationResult = async (username, password) => {
  const users = await ipcRenderer.invoke('read-users-file');

  // Find the user with the given username
  const foundUser = users.find(user => user.username === username);

  if (foundUser && foundUser.password === password) {
    // Authentication successful, set signed in user
    ipcRenderer.send('update-signed-in-user', foundUser);
    return { success: true, user: { ...foundUser } };
  } else {
    // Authentication failed
    return { success: false, message: 'Invalid username or password.' };
  }
};

function breakit(){
  //global.signedInUser = "frog";
  //var global.poopy = "doopy";
  localStorage.setItem("frog", 1);
}

// Set signed in user to null
const setSignedInUserToNull = () => {
  ipcRenderer.send('update-signed-in-user', null);
};

document.addEventListener('DOMContentLoaded', function () {
  // Set signed in user to null
  setSignedInUserToNull();

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
  signInForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    const result = await authenticationResult(username, password);

    if (result.success) {
      const authenticatedUser = result.user;
      console.log('Authentication successful:', authenticatedUser);

      localStorage.setItem("Username", username);

      for (let i=0; i<readUsersFile().length; i++){
        if (readUsersFile()[i].username == username){
          localStorage.setItem("UserID", i);
        }
      }



      switch (authenticatedUser.role.toLowerCase()) {
        case 'student':
          window.location.href = '../Main Dashboard page/MainDashboardStudent.html';
          break;
        case 'professor':
          window.location.href = '../Main Dashboard page/MainDashboardProfessor.html';
          break;
        case 'administrator':
          window.location.href = '../Main Dashboard page/MainDashboardAdmin.html';
          break;
        default:
          console.log('Error: Invalid user role read.');
      }
    } else {
      console.error('Authentication failed:', result.message);
    }
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