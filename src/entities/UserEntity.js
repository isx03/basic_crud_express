const connection = require("../config/connection")

const UserEntity = {
  active: 1,
  inactive: 0,

  getAll : async () => {
    const [ rows ] = await connection.promise().query('SELECT id, full_name, dni, email, status FROM users WHERE deleted_at IS NULL')
    return rows
  },

  create: async (user) => {
    await connection.promise().query('INSERT INTO users (full_name, dni, email) VALUES (?, ?, ?)', [
      user.fullName,
      user.dni,
      user.email
    ])
  },

  getById: async (userId) => {
    const [ rows ] = await connection.promise().query('SELECT id, full_name, dni, email, status FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1', [
      userId
    ])
    return rows[0]
  },

  getByDni: async (userDni) => {
    const [ rows ] = await connection.promise().query('SELECT id, full_name, dni, email, status FROM users WHERE dni = ? AND deleted_at IS NULL LIMIT 1', [
      userDni
    ])
    return rows[0]
  },

  getByEmail: async (userEmail) => {
    const [ rows ] = await connection.promise().query('SELECT id, full_name, dni, email, status FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1', [
      userEmail
    ])
    return rows[0]
  },

  update: async (user) => {
    await connection.promise().query('UPDATE users SET full_name = ?, dni = ?, email = ?, status = ?,  updated_at = NOW() WHERE id = ?', [
      user.fullName,
      user.dni,
      user.email,
      user.status,
      user.id
    ])
  },

  deleteById: async (userId) => {
    await connection.promise().query('UPDATE users SET updated_at = NOW(), deleted_at = NOW() WHERE id = ?', [
      userId
    ])
  }
}

module.exports = UserEntity