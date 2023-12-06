const fs = require('fs');

const usersFilePath = './users.json';

function readUsersFile() {
    try {
        const usersJsonData = fs.readFileSync(usersFilePath, 'utf8');
        return usersJsonData ? JSON.parse(usersJsonData) : [];
    } catch (error) {
        console.error('Error reading or parsing users JSON file:', error.message);
        return [];
    }
}

function saveUsersToFile(users) {
    try {
        const usersJsonData = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, usersJsonData, 'utf8');
    } catch (error) {
        console.error('Error writing users JSON file:', error.message);
    }
}

function createUser(user) {
    const users = readUsersFile();
    users.push(user);
    saveUsersToFile(users);
}

function editUser(userId, updatedUser) {
    const users = readUsersFile();
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        saveUsersToFile(users);
    } else {
        console.error('User not found for editing');
    }
}

function removeUser(userId) {
    const users = readUsersFile();
    const filteredUsers = users.filter(user => user.id !== userId);
    saveUsersToFile(filteredUsers);
}

module.exports = {
    readUsersFile,
    saveUsersToFile,
    createUser,
    editUser,
    removeUser
};