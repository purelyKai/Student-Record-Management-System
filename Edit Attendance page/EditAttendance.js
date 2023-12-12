// Used to invoke functions in main process rather than renderer process
const { ipcRenderer } = require('electron');

const displayUsers = async () => {
    const tableBody = document.getElementById('editAttendanceTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const users = await ipcRenderer.invoke('read-users-file');
    const courses = await ipcRenderer.invoke('read-courses-file');
   
    for(const course of courses) {
        for (const user of users) {
            const hasStudent = course.students.some(studentID => studentID === user.id);    

            if (hasStudent) {
                const newRow = tableBody.insertRow(tableBody.rows.length);

                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                const cell4 = newRow.insertCell(3);

                cell1.innerHTML = user.id;
                cell2.innerHTML = user.firstName;
                cell3.innerHTML = user.lastName;

                // Find the courses where the user is enrolled
                const enrolledCourses = courses.filter(course => course.students.includes(user.id));
            
                // Display course IDs and corresponding attendance
                if (enrolledCourses.length > 0) {
                    const coursesWithAttendance = enrolledCourses
                        .map(course => `${course.id}: ${course.attendanceRecords[user.id] || 'N/A'}`)
                        .join('<br>');

                    cell4.innerHTML = coursesWithAttendance;
                } else {
                    cell4.innerHTML = 'N/A';
                }
            }
        } break;

    }
};

const updateAttendance = (courseID, studentId, newAttendance) => {
    try {
        ipcRenderer.send('update-attendance', courseID, studentId, newAttendance);
    } catch (error) {
        console.error('Error updating attendance:', error);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');
    const updateAttendanceForm = document.getElementById('updateAttendanceForm');
    
    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
    displayUsers();

    updateAttendanceForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get values from the form
        const studentID = document.getElementById('id').value;
        const newAttendance = document.getElementById('attendance').value;
        const courseID = document.getElementById('courseID').value;
        
        updateAttendance(courseID, studentID, newAttendance);
        displayUsers();
    })
});





