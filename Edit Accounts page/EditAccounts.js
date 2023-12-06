// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');

// Access the signed-in user
const signedInUser = window.signedInUser;

const displayUsers = async () => {
    const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const users = await ipcRenderer.invoke('read-users-file');

    for (const user of users) {
        const newRow = tableBody.insertRow(tableBody.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);

        cell1.innerHTML = user.id;
        cell2.innerHTML = user.role;
        cell3.innerHTML = user.firstName;
        cell4.innerHTML = user.lastName;
        cell5.innerHTML = user.email;
        cell6.innerHTML = user.dateOfBirth;
        cell7.innerHTML = user.username;
        cell8.innerHTML = user.password;
    }
};

const addUser = async (role, firstName, lastName, email, dateOfBirth) => {
    try {
        const result = await ipcRenderer.invoke('create-user', role, firstName, lastName, email, dateOfBirth);
        // Do something with the result if needed
        console.log('User created:', result);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');
    const signInForm = document.getElementById('addUserForm');

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });

    displayUsers();

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Get values from the form
        const role = document.getElementById('role').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;

        await addUser(role, firstName, lastName, email, dateOfBirth);
        displayUsers();
    })
});