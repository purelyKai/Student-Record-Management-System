const { ipcRenderer } = require('electron');

// Abstract User class
class User {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        if (new.target === User) {
            throw new Error("Cannot instantiate abstract class");
        }
  
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.generateUsername(); // some standard format based on first and last name
        this.password = this.generateRandomPassword(); // some random string that can be changed later by user
        this.id = this.generateUserId(); // some standard format based on first and last name
        this.email = email;
        this.dateOfBirth = dateOfBirth;
  
        // Send an email to user with username and password
        /*ipcRenderer.send("sendEmail", {
            firstName: this.firstName,
            username: this.username,
            password: this.password,
            email: this.email
        });*/
    }
  
    generateUsername() { // In format: blackkai
        return `${this.lastName.toLowerCase()}${this.firstName.toLowerCase()}`;
    }
  
    generateRandomPassword() { // Generates a random 10 character password
        const randomString = Math.random().toString(36).slice(2);
        return randomString.slice(0, 10);
    }
  
    generateUserId() { // In format: KB6302
        return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}${Math.floor(Math.random() * 10000)}`;
    }
}
  
// Subclass for Student
class Student extends User {
    constructor() {
        super(...arguments);
        this.role = "Student";
    }
    // Add attributes specific to this class
}
  
// Subclass for Professor
class Professor extends User {
    constructor() {
        super(...arguments);
        this.role = "Professor";
    }
    // Add attributes specific to this class
}
  
// Subclass for School Administrator
class SchoolAdministrator extends User {
    constructor() {
        super(...arguments);
        this.role = "Administrator";
    }
    // Add attributes specific to this class
}


function processForm(event) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get values from the form
    var role = document.getElementById("role").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
  
    var user;

    switch (role.toLowerCase()) {
        case "student":
            user = new Student(firstName, lastName, email, dateOfBirth);
            break;

        case "professor":
            user = new Professor(firstName, lastName, email, dateOfBirth);
            break;

        case "administrator":
            user = new SchoolAdministrator(firstName, lastName, email, dateOfBirth);
            break;

        default:
            console.error("Invalid role entered");
            return;
    }

    // Save user to user accounts database
}
