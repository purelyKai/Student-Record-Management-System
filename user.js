document.addEventListener('DOMContentLoaded', function () {
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

    const form = document.getElementById('userForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
});