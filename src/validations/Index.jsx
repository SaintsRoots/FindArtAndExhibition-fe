// validateAuth
export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }

  return errors;
};
export const validateBooking = (values) => {
  let errors = {};

  if (!values.number_of_tickets) {
    errors.number_of_tickets = "Tickets Required";
  }

  return errors;
};

export const validateAuth = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }

  if (!values.name) {
    errors.name = "Username Required";
  }
  if (!values.role || values.role === "Choose Your Role") {
    errors.role = "Role Required";
  }

  return errors;
};

export const validateForgotPassword = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

//   contactform validation

export const validateContactForm = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.name) {
    errors.name = "Names Required";
  }
  if (!values.subject) {
    errors.subject = "Subject Required";
  }
  if (!values.message) {
    errors.message = "Message Required";
  }

  return errors;
};

// validating Artss Form
export const validateArtsForm = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Arts Name Required";
  }
  if (!values.category) {
    errors.category = "Arts category Required";
  }

  if (!values.available_arts) {
    errors.available_arts = "Available Arts Required";
  }
  if (!values.price) {
    errors.price = "Price Required";
  }
  if (!values.image) {
    errors.image = "Image Required";
  }
  if (!values.description) {
    errors.description = "Description Required";
  }

  return errors;
};
