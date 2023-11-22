// Abstract User class
class User {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        if (this.constructor === User) {
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
    }

    // Getter functions
    getRole() { return this.role }
    getFirstName() { return this.firstName }
    getLastName() { return this.lastName }
    getUsername() { return this.username }
    getPassword() { return this.password }
    getId() { return this.id }
    getEmail() { return this.email }
    getDateOfBirth() { return this.dateOfBirth }

    // Setter function for password
    setPassword(newPassword) {
        this.password = newPassword;
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

// Abstract subclass for users with profile
class UserWithProfile extends User {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        super(role, firstName, lastName, email, dateOfBirth);
        this.preferredName = null;
        this.interests = null;
        this.hobbies = null;
        this.skills = null;
    }

    // Getter functions
    getPreferredName() { return this.preferredName }
    getInterests() { return this.interests }
    getHobbies() { return this.hobbies }
    getSkills() { return this.skills }

    // Setter functions
    setPreferredName(preferredName) { this.preferredName = preferredName }
    setInterests(interests) { this.interests = interests }
    setHobbies(hobbies) { this.hobbies = hobbies }
    setSkills(skills) { this.skills = skills }
}

// Subclass for Student
class Student extends UserWithProfile {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        super(role, firstName, lastName, email, dateOfBirth);
        this.role = "Student";
        this.courses = []; // Property to store references to courses
    }

    // Add a course the student is attending
    addCourse(course) {
        this.courses.push(course);
    }

    // Remove a course from the student's records
    removeCourse(course) {
        const index = this.courses.indexOf(course);
        if (index !== -1) {
            this.courses.splice(index, 1);
        }
    }

    // Getters for accessing each course, grades and attendance restricted to this student
}

// Subclass for Professor
class Professor extends UserWithProfile {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        super(role, firstName, lastName, email, dateOfBirth);
        this.role = "Professor";
        this.courses = []; // Property to store references to courses
    }

    // Getters & Setters for accessing each course
}

// Subclass for School Administrator
class SchoolAdministrator extends User {
    constructor(role, firstName, lastName, email, dateOfBirth) {
        super(role, firstName, lastName, email, dateOfBirth);
        this.role = "Administrator";
    }
}

module.exports = {
    Student,
    Professor,
    SchoolAdministrator
};