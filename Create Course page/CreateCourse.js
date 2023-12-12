// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');

const addCourse = (courseName, startDate, endDate, selectedDays, startTime, endTime, optionalMeetingDate, optionalMeetingTime) => {
    try {
        ipcRenderer.send('create-course', courseName, startDate, endDate, selectedDays, startTime, endTime, optionalMeetingDate, optionalMeetingTime);
    } catch (error) {
        console.error('Error creating course:', error);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');
    const makeCourseForm = document.getElementById('make-course-form');

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });

    makeCourseForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Get values from the form
        const courseName = document.getElementById('course-text-input').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        var selectedDays = [];
        var checkboxes = document.getElementsByName("course-condition");
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                selectedDays.push(checkbox.value);
            }
        });
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const optionalMeetingDate = document.getElementById('optionalMeetingDate').value || null;
        const optionalMeetingTime = document.getElementById('optionalMeetingTime').value || null;

        // Perform actions with the obtained form values
        addCourse(courseName, startDate, endDate, selectedDays, startTime, endTime, optionalMeetingDate, optionalMeetingTime);
    })
});