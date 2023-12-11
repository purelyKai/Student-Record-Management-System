// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');
const { readCoursesFile } = require('../Class Implementations/Courses');
const { readUsersFile } = require('../Class Implementations/Users');

// Access the signed-in user
const signedInUser = window.signedInUser;
document.addEventListener('DOMContentLoaded', function () {
    
});


function generateAccountLinks(){
//Generate buttons on search page linking to user accounts

    accountsDisplayed = filterAccounts(); //calls function to filter accounts for the user
    

    for (let i=0; i<readUsersFile().length; i++){
        //Loop through all user profiles

        if (accountsDisplayed[i] != undefined && accountsDisplayed[i].role != 'Administrator'){
        //Only display valid users with profiles

            var accountButton = document.createElement('input');
            accountButton.type = "button";
            accountButton.value = accountsDisplayed[i].firstName + 
                                "   " + 
                                accountsDisplayed[i].lastName + 
                                " | " +
                                accountsDisplayed[i].role + 
                                " | " +
                                accountsDisplayed[i].interests + 
                                " | " +
                                accountsDisplayed[i].hobbies + 
                                " | " +
                                accountsDisplayed[i].skills;
            accountButton.setAttribute("onClick", "clickProf(this.id)");
            accountButton.id = "accountButtonId" + i; //Keeping this here because I think I'll use it for click actions later when necessary
            //accountButton.id = "accountButtonId"
            document.getElementById("buttonHolder").appendChild(accountButton);
        }   
    }
}


function filterAccounts(){
//Return a filtered array of accounts based on input in profile search page

    //Variables that simplify the search culling loops in the below block
    var profileType = document.getElementById('searchModifiers').options[document.getElementById('searchModifiers').selectedIndex].value;
    var accountsDisplayed = readUsersFile();

    if (profileType != "Both"){
    //Delete profiles that don't match dropdown menu if not "both"
        console.log("The profiles are ready!");
        for (let i=0; i<readUsersFile().length; i++){
            if (accountsDisplayed[i].role != profileType){
                delete accountsDisplayed[i];
            }
        }
        console.log(accountsDisplayed);
    }

    var searchValue = document.getElementById("searchBar").value; //Greatly shortens the amount I have to type

    if (searchValue != ""){
    //Delete accounts that do not display information in search bar when "search" pressed
        console.log("The search bar is populated");
        for (let i=0; i<readUsersFile().length; i++){ 
            if (accountsDisplayed[i] != undefined
                && ( //I'm so sorry for this attorcious block of repeated text. I swear I could shorten it if I were being paid to!
                    accountsDisplayed[i].firstName == searchValue ||
                    accountsDisplayed[i].lastName == searchValue ||
                    accountsDisplayed[i].preferredName == searchValue || 
                    accountsDisplayed[i].interests == searchValue ||
                    accountsDisplayed[i].hobbies == searchValue ||
                    accountsDisplayed[i].skills == searchValue
                )){
            }
            else{
                delete accountsDisplayed[i];
            }
        }
    }

    return accountsDisplayed;
}


function clickProf(clickedId){

    //alert(clickedId); //helping me create user page
    localStorage.setItem("WetBlanket", readUsersFile()[1]);
    //StoredAccountValue = 1; //placeholder so buttons will store their proper accounts
    location.href="../Profile Page/Profile.html"; 
}


function searchRefresh(){
//Delete button elements

    for (let i=0; i<readUsersFile().length; i++){
        if(document.getElementById("accountButtonId" + i) != null){
        //Prevents errors in the console when deleting buttons

            var victim = document.getElementById("accountButtonId" + i);
            victim.remove();
            //location.reload();
        }
    }

    generateAccountLinks();
}








































/*

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');

    function ClickHome(){
        location.href="../Dashboard_Page/HomeScreen.html";
    }


    function ClickProf(StoredAccountValue){
        StoredAccountValue = 1; //placeholder so buttons will store their proper accounts
        location.href="../Profile_Page/Profile.html"; 
    }


    function LoopTest() { //This is a good start. It makes 4 buttons labelled "button 1" - 4. I need it to make buttons UNDER the element (possible) that contain the student username, photo, and maybe description but it cuts off at a certain word. Implement a default pfp too
        for (let i=0;i<AccountTable.length;i++) {  //AccountTable is not imported from class structure. I cannot make this button work until we can make AccountTable a global without making it a const
            var AccountButton = document.createElement('input');
            AccountButton.type="button";
            AccountButton.value=AccountTable[i].ProfilePic + " " + AccountTable[i].FirstName + " " + AccountTable[i].LastName + "\n " + AccountTable[i].Description; //Figure out how to put a newline here. Might be CSS? Also formatting. This is awful but can be made much better with a pfp and better divisions between elements
            AccountButton.setAttribute('onClick', 'ClickProf(AccountTable[i])') //Eventually we'll make a loop that sneds you to an individual user profile but this is a Proof of concept so it's good enough for now
            document.getElementById('ProfileBox').appendChild(AccountButton);

            //var lineBreak = document.createElement('<br >'); //This block SHOULD create a line break between buttons
            //element.appendChild(lineBreak);

        }
    }

    //Search array that holds a second 2d array of all elements
    //It calls itself against every modifier

    function searchModifiers() { //On click of search, we're going to call this against the search bar's inputs against name and description
        var fieldInput = document.getElementById("searchBar").value;

        for (let i=0; i<AccountTable.length; i++){
            if (fieldInput!=AccountTable[i].FirstName){
                AccountTable.pop();
                console.warn(AccountTable[i].FirstName);
                //we're going to check the section of focus for changed value
            }
        }
        //This will be a case switch that repeatedly calls this function with our temp array
        LoopTest();
    }

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
});*/

/*function clickProf(StoredAccountValue){
    StoredAccountValue = 1; //placeholder so buttons will store their proper accounts
    location.href="../Profile Page/Profile.html";
}*/


/*
function generateAccountLinks(){
    //Display buttons for all courses linked to signed in user
    /*
    uservalue = 4; //temp value to identify user since I can't get the actual variable to work rn

    
    for (let i = 0; i < readCoursesFile().length; i++) {
        //loop through all courses in database
        for (let j=0; j < readUsersFile()[uservalue].courses.length; j++){
            //loop through all courses under logged in user

            if (readCoursesFile()[i].id == readUsersFile()[uservalue].courses[j]){
                //if the user has a course found in the database, we store that information and print it on a button

                //console information
                console.log("found Matching Course")
                console.log(readCoursesFile()[i].courseName);

                //button code
                var courseButton = document.createElement('input');
                courseButton.type="button";
                courseButton.value=readCoursesFile()[i].courseName;
                courseButton.setAttribute('onClick', 'clickProf(1)') //Eventually we'll make a loop that sneds you to an individual user profile but this is a Proof of concept so it's good enough for now
                document.getElementById('buttonHolder').appendChild(courseButton);
            }
        }
    }
    console.log("test");
    console.log(readUsersFile());
}*/
