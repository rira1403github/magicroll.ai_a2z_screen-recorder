// const bcrypt = require('bcryptjs');

// const users = [];

// function findUser(username) {
//   return users.find(user => user.username === username);
// }

// function createUser({ username, password, name, mobileNumber }) {
//   const hashedPassword = bcrypt.hashSync(password, 8);
//   const newUser = { username, password: hashedPassword, name, mobileNumber };
//   users.push(newUser);
//   return newUser;
// }

// module.exports = {
//   users,
//   findUser,
//   createUser
// };



const bcrypt = require('bcryptjs');

// In-memory user store (temporary for development/testing)
const users = [];

/**
 * Find a user by username
 * @param {string} username
 * @returns {object|null}
 */
function findUser(username) {
  return users.find(user => user.username === username) || null;
}

/**
 * Create a new user with hashed password
 * @param {Object} param0
 * @param {string} param0.username
 * @param {string} param0.password
 * @param {string} param0.name
 * @param {string} param0.mobileNumber
 * @returns {Object} new user
 */
function createUser({ username, password, name, mobileNumber }) {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { username, password: hashedPassword, name, mobileNumber };
  users.push(newUser);
  return newUser;
}

/**
 * Verify user's credentials
 * @param {string} username
 * @param {string} password
 * @returns {object|null}
 */
function authenticateUser(username, password) {
  const user = findUser(username);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  users,
  findUser,
  createUser,
  authenticateUser
};
