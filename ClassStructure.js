///Hold the class data and imported class objects that is read by the system


class Account {
    //User accounts. Cascades into student, professor, and faculty accounts
    constructor(userID, Username, Password, ProfilePic, FirstName, LastName, Description, dateofBirth, email){
        this.userID = userID;
        this.Username = Username;
        this.Password = Password;
        this.ProfilePic = ProfilePic;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Description = Description;
        this.dateofBirth = dateofBirth;
        this.email = email;

    }
}


class Course{
    //Courses registered to the school including their time slots and english name
    constructor(courseID, courseName, startDate, endDate, courseStartTime, courseEndTime){
        this.courseID = courseID;
        this.courseName = courseName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.courseStartTime = courseStartTime;
        this.courseEndTime = courseEndTime;
    }
}


class AdditionalCouseOccurence{
    //Space for odd dates and times a class may occur
    constructor(occurenceID, dateofOccurence, startTime, endTime, courseID){
        this.occurenceID = occurenceID;
        this.dateofOccurence = dateofOccurence;
        this.startTime = startTime;
        this.endTime = endTime;
        Course.courseID = courseID; //gets course name from here

    }
}


class CourseList{
    //Table to tie specific user id's to courses. Keeps a full list of registered students and staff
    constructor(studentCourseID, courseID, userID){
        this.studentCourseID = studentCourseID;
        Course.courseID = courseID;
        Account.userID = userID;
    }
}


class Grades{
    //Space to track individual student grades per class. This system will only track final grades per class
    constructor(courseID, userID, gradeID){
        Course.courseID = courseID;
        Account.userID = userID;
        this.gradeID = gradeID;
    }
}


class Attendance{
    //Space to track individual student attendance per day, per class
    constructor(courseID, userID, date, didAttend){
        Course.courseID = courseID;
        Account.userID = userID;
        this.date = date;
        this.didAttend = didAttend;
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