// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');

// Access the signed-in user
const signedInUser = window.signedInUser;

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
});