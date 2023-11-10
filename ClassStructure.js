///Hold the class data and imported class objects that is read by the system


class Account {
    //User accounts. Cascades into student, professor, and faculty accounts
    constructor(Username, Password, ProfilePic, FirstName, LastName, Description){
        this.Username = Username;
        this.Password = Password;
        this.ProfilePic = ProfilePic;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Description = Description;
    }
}

//This block is later to be stored in an external text file. This is temporary
const Account1 = new Account("1", "2","URL Here" , "Billy", "Bob", "Really cool. Hates math.");
const Account2 = new Account("3", "4","URL Here" , "Bill", "Murray", "Wants to be an actor");
const Account3 = new Account("5", "6","URL Here" , "A", "Student", "Claims to like studying. Doesn't");
const Account4 = new Account("GabeNewell", "Gaben", "URL Here", "Gabe", "Newell", "Yes. That was really his password");
const Account5 = new Account("7", "8", "URL");

AccountTable = [Account1, Account2, Account3, Account4, Account5];

//classes are upercased on all words. Variables are camel case
//Pages are all going to be in individual folders