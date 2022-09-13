const express = require("express");
const { all } = require("../server");

exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(422).send(error.details);
    } else {
      next();
    }
  };
};

// module.exports = {
//   validate,
// };
