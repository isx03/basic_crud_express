const { StatusCodes } = require("http-status-codes")
const UserEntity = require("../entities/UserEntity")

const UserController = {
  index : async (_req, res, next) => {
    try {
      const users = await UserEntity.getAll()
      res.status(StatusCodes.OK).json(users)
    } catch (error) {
      next(error)
    }
  },

  create: async (req, res, next) => {
    try {
      const newUser = {
        fullName: req.body.full_name,
        dni: req.body.dni,
        email: req.body.email
      }
  
      let userFound = await UserEntity.getByDni(newUser.dni)
      if( userFound ){
        return res.status(StatusCodes.FORBIDDEN).json({
          error: `User with DNI ${newUser.dni} already exist`
        })
      }
  
      userFound = await UserEntity.getByEmail(newUser.email)
      if( userFound ){
        return res.status(StatusCodes.FORBIDDEN).json({
          error: `User with email ${newUser.email} already exist`
        })
      }
  
      await UserEntity.create(newUser)
  
      res.status(StatusCodes.CREATED).json({
        message: 'User created successfully'
      })
    } catch (error) {
      next(error)
    }
  },

  edit: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id)
      userId = !isNaN(req.params.id) ? req.params.id : 0
      
      const user = await UserEntity.getById(userId)
      if( !user ){
        return res.status(StatusCodes.NOT_FOUND).json({
          error: 'User not found'
        })
      }
  
      res.status(StatusCodes.OK).json(user)
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id)
      userId = !isNaN(req.params.id) ? req.params.id : 0
  
      const user = {
        id: userId,
        fullName: req.body.full_name,
        dni: req.body.dni,
        email: req.body.email,
        status: req.body.status || UserEntity.active
      }
  
      let userFound = await UserEntity.getById(user.id)
      if( !userFound ){
        return res.status(StatusCodes.NOT_FOUND).json({
          error: `User does not exist`
        })
      }
  
      userFound = await UserEntity.getByDni(user.dni)
      if( userFound && userFound.id != user.id ){
        return res.status(StatusCodes.FORBIDDEN).json({
          error: `User with DNI ${user.dni} already exist`
        })
      }
  
      userFound = await UserEntity.getByEmail(user.email)
      if( userFound && userFound.id != user.id ){
        return res.status(StatusCodes.FORBIDDEN).json({
          error: `User with email ${user.email} already exist`
        })
      }
  
      await UserEntity.update(user)
  
      res.status(StatusCodes.OK).json({
        message: 'User updated successfully'
      })
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id)
      userId = !isNaN(req.params.id) ? req.params.id : 0
  
      const user = await UserEntity.getById(userId)
      if( !user ){
        return res.status(StatusCodes.NOT_FOUND).json({
          error: 'User not found'
        })
      }
  
      await UserEntity.deleteById(userId)
  
      res.status(StatusCodes.OK).json({
        message: 'User delected sucessfully'
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = UserController