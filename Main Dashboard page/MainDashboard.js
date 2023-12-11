// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');
const { readUsersFile } = require('../Class Implementations/Users');
const { readCoursesFile } = require('../Class Implementations/Courses');

// Access the signed-in user
const signedInUser = window.signedInUser;
document.addEventListener('DOMContentLoaded', function () {
    
});


function clickProf(StoredAccountValue){
    StoredAccountValue = 1; //placeholder so buttons will store their proper accounts
    location.href="../Profile Page/Profile.html";
}



function generateCourseLinks(){
    //Display buttons for all courses linked to signed in user

    uservalue = 1; //temp value to identify user since I can't get the actual variable to work rn
    console.log("running Generate Course Links")

    
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
                courseButton.value="Course Dashboard - " + readCoursesFile()[i].courseName;
                //courseButton.setAttribute('onClick', 'clickProf(1)') //Eventually we'll make a loop that sneds you to an individual user profile but this is a Proof of concept so it's good enough for now
                document.getElementById('buttonHolder').appendChild(courseButton);
            }
        }
    }
}