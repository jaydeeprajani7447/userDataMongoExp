const Joi = require("joi");

const userRegistrationDataValidation = Joi.object().keys({
  fullName: Joi.string().min(3).max(20).required(),

  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(new RegExp("^[a-zA-Z0-9_!@#$%.]{8,32}$"))
    .required(),

  dateOfBirth: Joi.date().raw(),
});

const userLoginDataValidation = Joi.object({
  email: Joi.string()
    .required()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string().required().min(6).max(15),
});

const userGetDataValidation = Joi.object({
  email: Joi.string()
    .required()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

const userPasswordValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(new RegExp("^[a-zA-Z0-9_!@#$%.]{8,32}$"))
    .required(),
  repeatedPassword: Joi.string().required().equal(Joi.ref('newPassword')),
})

module.exports = {
  userRegistrationDataValidation,
  userLoginDataValidation,
  userGetDataValidation,
  userPasswordValidation,
};
