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

function dataTest(){
    fs = require('fs');
    var name = 'users.json';
    var m = JSON.parse(fs.readFileSync(name).toString());
    m.forEach(function(p){
    p.name= m.name;
    });
    console.log(m);
    console.log(m[2]);
    console.log(m[2].role);
    m[2].role = "stinky";
    console.log(m);
    //fs.writeFileSync(name, JSON.stringify(m));
}

function updateJson(){
    const signedInId = localStorage.getItem("userPosition"); //call signed in user

    fs = require('fs'); //import "users" JSON file as readable javascript text
    var file = 'users.json';
    var data = JSON.parse(fs.readFileSync(file).toString());
    data.forEach(function(p){
        p.name = data.name;
    });

    //This section updates the temporary data file ONLY if the new data is not blank
    if (document.getElementById("preferredName").value != ""){
        data[signedInId].preferredName = document.getElementById("preferredName").value;
    }
    if (document.getElementById("hobbies").value != ""){
        data[signedInId].hobbies = document.getElementById("hobbies").value;
    }
    if (document.getElementById("interests").value != ""){
        data[signedInId].interests = document.getElementById("interests").value;
    }
    if (document.getElementById("skills").value != ""){
        data[signedInId].skills = document.getElementById("skills").value;
    }

    //This section overwrites the JSON file
    fs.writeFileSync(file, JSON.stringify(data));

    //Kicks you out of edit page. Uses history.back instead of href so the back button works afterwards
    history.back();
}
    