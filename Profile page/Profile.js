// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');
const { readUsersFile } = require('../Class Implementations/Users');

// Access the signed-in user
const signedInUser = window.signedInUser;

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');


    function logOut(){
        location.href="../Login_Page/Login.html";
    }
    
    function returnToDash(){
        location.href="../Dashboard_Page/HomeScreen.html";
    }

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
}); 


function checkProfileInformation(){
    const signedInId = localStorage.getItem("userPosition");
    const currentPage = localStorage.getItem("clickedAccountId");

    if (signedInId == currentPage){
        console.log(signedInId);
        console.log(currentPage);
        var editButton = document.createElement('input');
        editButton.type = "button";
        editButton.value = "EditProfile";
        editButton.setAttribute("onClick", "clickProf()");
        //accountButton.id = i; //Sets each button to a number. Easier to remember later
        //accountButton.id = "accountButtonId"
        document.getElementById("edit-button").appendChild(editButton); //this is always in the header, below the back button
    }

    //Sets displayed profile first name to preferred name if exists. Otherwise, we default to their real first name
    if (readUsersFile()[currentPage].preferredName != null)
    {
        document.getElementById("nameText").textContent = readUsersFile()[currentPage].preferredName + " " + readUsersFile()[currentPage].lastName;        
    }
    else{
        document.getElementById("nameText").textContent = readUsersFile()[currentPage].firstName + " " + readUsersFile()[currentPage].lastName;
    }
    
    document.getElementById("roleText").textContent = readUsersFile()[currentPage].role;

    document.getElementById("skillsText").textContent = readUsersFile()[currentPage].skills;
    document.getElementById("hobbiesText").textContent = readUsersFile()[currentPage].hobbies;
    document.getElementById("interestsText").textContent = readUsersFile()[currentPage].interests;



}


function clickProf(){
//Sends user to an "edit accounts" page
    location.href = "../Edit Account(Signed In) Page/EditAccount.html"
    console.log("ForUseLater")
}