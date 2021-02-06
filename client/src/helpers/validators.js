module.exports.required = value => (value ? undefined : 'Required');
module.exports.maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
module.exports.minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
module.exports.number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
module.exports.minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
module.exports.email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address' : undefined;
module.exports.alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters' : undefined;
module.exports.lowercaseAndNumbers = value =>
  value && /[^a-z0-9 ]/.test(value)
    ? 'Only lowercase letters and/or numbers' : undefined;
module.exports.phoneNumber = value =>
  value && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,9}$/im.test(value)
    ? 'Invalid phone number' : undefined;
