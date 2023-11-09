class Account {
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
const Account2 = new Account("3", "4","URL Here" , "Billy", "Bob", "Really cool. Hates math.");
const Account3 = new Account("555", "6","URL Here" , "Billy", "Bob", "Really cool. Hates math.");
const Account4 = new Account("GabeNewell", "Gaben", "URL Here", "Gabe", "Newell", "Yes. That was really his password");
const Account5 = new Account("7", "8", "URL");

AccountTable = [Account1, Account2, Account3, Account4, Account5];

function AccessAccount(){
    var UsernameInput = document.getElementById("Username").value;
    var PasswordInput = document.getElementById("Password").value;

    for (let i=0; i<AccountTable.length; i++){
        if (AccountTable[i].Username == UsernameInput){
            if (AccountTable[i].Password == PasswordInput){
                console.log("Login sucess!");
                location.href="../WebPages/HomeScreen.html";
            }
            else{
                break;
            }
        }

        console.warn("WRONG AGAIN");
    }
}

//next we'll populate the objects with several accounts
//To check which account we're logging in from, you'll have a for loop that's size: sizeof the account array or whatever I set up
//If we find a matching username, compare to the password of that username. Since there are no dupe usernames, I shouldn't have to check a second time
//We should also put the warning text on the actual page instead of in the console