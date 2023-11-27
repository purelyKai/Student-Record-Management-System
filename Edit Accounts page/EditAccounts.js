// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');

// Access the signed-in user
const signedInUser = window.signedInUser;

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
});