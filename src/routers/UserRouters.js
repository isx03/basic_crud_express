const express = require('express')
const UserController = require('../controllers/UserController')
const UserPayloadValidation = require('../validations/payload/UserPayloadValidation')
const UserRouters = express.Router()

UserRouters.get("/", UserController.index)

UserRouters.post("/", UserPayloadValidation, UserController.create)

UserRouters.get("/:id", UserController.edit)

UserRouters.put("/:id", UserPayloadValidation, UserController.update)

UserRouters.delete("/:id", UserController.delete)

module.exports = UserRouters