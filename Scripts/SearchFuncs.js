class Account { //SINFUL. PLEASE MAKE THIS BLOCK IN CLASS STRUCTURES GLOBAL. THIS IS SO BAD
    constructor(Username, Password, ProfilePic, FirstName, LastName, Description){
        this.Username = Username;
        this.Password = Password;
        this.ProfilePic = ProfilePic;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Description = Description;
    }
}

const Account1 = new Account("1", "2","URL Here" , "Billy", "Bob", "Really cool. Hates math.");
const Account2 = new Account("3", "4","URL Here" , "Bill", "Murray", "Wants to be an actor");
const Account3 = new Account("5", "6","URL Here" , "A", "Student", "Claims to like studying. Doesn't");

AccountTable = [Account1, Account2, Account3]

function ClickHome(){
    location.href="../WebPages/HomeScreen.html";
}


function LoopTest() { //This is a good start. It makes 4 buttons labelled "button 1" - 4. I need it to make buttons UNDER the element (possible) that contain the student username, photo, and maybe description but it cuts off at a certain word. Implement a default pfp too
    for (let i=0;i<AccountTable.length;i++) {  //AccountTable is not imported from class structure. I cannot make this button work until we can make AccountTable a global without making it a const
        var AccountButton = document.createElement('input');
        AccountButton.type="button";
        AccountButton.value=AccountTable[i].FirstName + " " + AccountTable[i].LastName + " " + AccountTable[i].Description; //Figure out how to put a newline here. Might be CSS? Also formatting. This is awful but can be made much better with a pfp and better divisions between elements
        AccountButton.setAttribute('onClick', 'ClickHome()') //Eventually we'll make a loop that sneds you to an individual user profile but this is a Proof of concept so it's good enough for now
        document.getElementById('ProfileBox').appendChild(AccountButton);
    }
}