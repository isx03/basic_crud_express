const { StatusCodes } = require("http-status-codes")
const Joi = require("joi")
const UserEntity = require("../../entities/UserEntity")

const UserPayloadValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      full_name: Joi.string()
        .required()
        .pattern(new RegExp('[A-Za-z]+(\s[A-Za-z]+)?'))
        .error(new Error('User name must be alphabetic only')),
      dni: Joi.string()
        .required()
        .pattern(new RegExp('[0-9]'))
        .length(8)
        .error(new Error('DNI must be number and 8 digits only')),
      email: Joi.string()
        .required()
        .email()
        .error(new Error('Email must be correct format')),
      status: Joi.any()
        .optional()
        .valid(UserEntity.active, UserEntity.inactive)
        .error(new Error('User status incorrect'))
    })
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: error.message
    })
  }
}

module.exports = UserPayloadValidation