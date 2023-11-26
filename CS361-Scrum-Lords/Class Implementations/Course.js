// Class for a course
class Course {
    constructor(courseName, startDate, endDate, daysOfTheWeek, startTime, endTime, optionalMeetingDate = null, optionalMeetingTime = null) {
        this.courseName = courseName;
        this.id = this.generateCourseId(); // Some standard format based on course name
        this.startDate = startDate;
        this.endDate = endDate;
        this.daysOfTheWeek = daysOfTheWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.optionalMeetingDate = optionalMeetingDate;
        this.optionalMeetingTime = optionalMeetingTime;

        // Initialize empty lists for students, grades, and attendance records
        this.students = [];
        this.grades = new Map(); // Map to store grades with student as the key
        this.attendanceRecords = new Map(); // Map to store attendance records with student as the key

        // Reference to the professor who runs the course
        this.professor = null;
    }

    // Getter functions
    getCourseName() { return this.courseName }
    getId() { return this.id }
    getStartDate() { return this.startDate }
    getEndDate() { return this.endDate }
    getDaysOfTheWeek() { return this.daysOfTheWeek }
    getStartTime() { return this.startTime }
    getEndTime() { return this.endTime }
    getOptionalMeetingDate() { return this.optionalMeetingDate }
    getOptionalMeetingTime() { return this.optionalMeetingTime }
    getProfessor() { return this.professor }

    generateCourseId() { // In format: P453
        return `${this.courseName.charAt(0)}${Math.floor(Math.random() * 1000)}`;
    }

    // Add a student to the course
    addStudent(student) {
        this.students.push(student);
        this.grades.set(student, null); // Initialize grade as null for the student
        this.attendanceRecords.set(student, []); // Initialize attendance records as an empty array for the student
    }

    // Remove a student from the course
    removeStudent(student) {
        const studentIndex = this.students.indexOf(student);
        if (studentIndex !== -1) {
            this.students.splice(studentIndex, 1);
            this.grades.delete(student);
            this.attendanceRecords.delete(student);
        }
    }

    // Update the grade for a student in the course
    updateGrade(student, grade) {
        if (this.students.includes(student)) {
            this.grades.set(student, grade);
        } else {
            console.error("Student is not enrolled in the course.");
        }
    }

    // Get the grade for a specific student in the course
    getGrade(student) {
        if (this.students.includes(student)) {
            return this.grades.get(student);
        } else {
            console.error("Student is not enrolled in the course.");
            return null;
        }
    }

    // Record attendance for a student on a specific date
    recordAttendance(student, date, isPresent = false) {
        if (this.students.includes(student)) {
            const attendanceList = this.attendanceRecords.get(student);
            attendanceList.push({ date, isPresent });
        } else {
            console.error("Student is not enrolled in the course.");
        }
    }

    // Get the attendance records for a specific student in the course
    getAttendanceStatus(student, date) {
        if (this.students.includes(student)) {
            const attendanceList = this.attendanceRecords.get(student);
            const attendanceEntry = attendanceList.find(entry => entry.date === date);
            return attendanceEntry ? attendanceEntry.isPresent : null;
        } else {
            console.error("Student is not enrolled in the course.");
            return null;
        }
    }
}

module.exports = {
    Course
};