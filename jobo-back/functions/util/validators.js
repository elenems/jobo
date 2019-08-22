exports.validateEmail = email => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim().length === 0) {
    return {
      valid: false,
      message: "Please enter an email adress"
    };
  }

  if (!email.match(regEx)) {
    return {
      valid: false,
      message: "Email is incorrect"
    };
  }

  return { valid: true };
};

exports.validatePassword = (password, confirmPassword) => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must contain at least 8 characters"
    };
  }
  if (password.length > 24) {
    return {
      valid: false,
      message: "Password must be less than 25 characters"
    };
  }
  if (confirmPassword) {
    if (password !== confirmPassword) {
      return {
        valid: false,
        message: "Passwords do not match!"
      };
    }
  }

  return { valid: true };
};

exports.validateCred = cred => {
  if (cred.length > 46) {
    return {
      valid: false,
      message: "To many letters"
    };
  }

  return { valid: true };
};

exports.validatePhone = phone => {
  const regex = /\d{10}/g;
  phone += "";
  if (!phone.match(regex)) {
    return {
      valid: false,
      message: "Invalid number"
    };
  }

  return { valid: true };
};

exports.isEmpty = text => {
  if (!text.length) {
    return { valid: false, message: "Must not be empty" };
  }
  return { valid: true };
};

