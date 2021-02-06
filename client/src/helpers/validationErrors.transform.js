export function transform(error) {
  const errorMessages = JSON.parse(error.message).errors;
  const obj = {};
  errorMessages.forEach((item, index) => {
    obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
  });
  return obj;
}

export function transformObjectError(error) {
  const errorMessages = JSON.parse(error.message).errors;
  const obj = {};
  errorMessages.forEach((item, index) => {
    if (Object.keys(item)[0].includes('/')) {
      obj[Object.keys(item)[0].split('/').pop()] = item[Object.keys(item)[0]];
    } else {
      obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    }
  });
  return obj;
}
