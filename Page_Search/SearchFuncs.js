function ClickHome(){
    location.href="../Page_Dashboard/HomeScreen.html";
}


function ClickProf(){
    location.href="../Page_Profile/Profile.html";
}


function LoopTest() { //This is a good start. It makes 4 buttons labelled "button 1" - 4. I need it to make buttons UNDER the element (possible) that contain the student username, photo, and maybe description but it cuts off at a certain word. Implement a default pfp too
    for (let i=0;i<AccountTable.length;i++) {  //AccountTable is not imported from class structure. I cannot make this button work until we can make AccountTable a global without making it a const
        var AccountButton = document.createElement('input');
        AccountButton.type="button";
        AccountButton.value=AccountTable[i].ProfilePic + " " + AccountTable[i].FirstName + " " + AccountTable[i].LastName + " " + AccountTable[i].Description; //Figure out how to put a newline here. Might be CSS? Also formatting. This is awful but can be made much better with a pfp and better divisions between elements
        AccountButton.setAttribute('onClick', 'ClickProf()') //Eventually we'll make a loop that sneds you to an individual user profile but this is a Proof of concept so it's good enough for now
        document.getElementById('ProfileBox').appendChild(AccountButton);

        //var lineBreak = document.createElement('<br >'); //This block SHOULD create a line break between buttons
        //element.appendChild(lineBreak);

    }
}