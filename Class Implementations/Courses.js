const fs = require('fs');

const coursesFilePath = './courses.json';

function readCoursesFile() {
    try {
        const coursesJsonData = fs.readFileSync(coursesFilePath, 'utf8');
        return coursesJsonData ? JSON.parse(coursesJsonData) : [];
    } catch (error) {
        console.error('Error reading or parsing courses JSON file:', error.message);
        return [];
    }
}

function saveCoursesToFile(courses) {
    try {
        const coursesJsonData = JSON.stringify(courses, null, 2);
        fs.writeFileSync(coursesFilePath, coursesJsonData, 'utf8');
    } catch (error) {
        console.error('Error writing courses JSON file:', error.message);
    }
}

function addCourse(course) {
    const courses = readCoursesFile();
    courses.push(course);
    saveCoursesToFile(courses);
}

function editCourse(courseId, updatedCourse) {
    const courses = readCoursesFile();
    const index = courses.findIndex(course => course.id === courseId);
    if (index !== -1) {
        courses[index] = { ...courses[index], ...updatedCourse };
        saveCoursesToFile(courses);
    } else {
        console.error('Course not found for editing');
    }
}

function removeCourse(courseId) {
    const courses = readCoursesFile();
    const filteredCourses = courses.filter(course => course.id !== courseId);
    saveCoursesToFile(filteredCourses);
}

module.exports = {
    readCoursesFile,
    saveCoursesToFile,
    addCourse,
    editCourse,
    removeCourse
};