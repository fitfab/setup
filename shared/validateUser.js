const Validator = require('validator');
const isEmpty = require('lodash').isEmpty;

module.exports = function validateUser(data) {
    let errors = {};

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'This field is required.';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'This field is required.';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required.';
    }

    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required.';
    }

    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'This field is required.';
    }

    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
