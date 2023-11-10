///Allow user to log into their account using information imported from Class Structure


function AccessAccount(){
  //Log in to appropriate user accout input into login fields
    var UsernameInput = document.getElementById("Username").value;
    var PasswordInput = document.getElementById("Password").value;

    for (let i=0; i<AccountTable.length; i++){
        if (AccountTable[i].Username == UsernameInput){
            if (AccountTable[i].Password == PasswordInput){
                console.log("Login sucess!");
                location.href="../Page_Dashboard/HomeScreen.html";
            }
            else{
                break;
            }
        }

        console.warn("WRONG AGAIN");
    }
}


function displayPassword() {
  //Change password to plain text when checkbox is clicked
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

//We should also put the warning text on the actual page instead of in the console