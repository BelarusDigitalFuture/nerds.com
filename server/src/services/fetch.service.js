const fetch = require('isomorphic-fetch');
const qs = require('querystring');

module.exports = ({
  baseApiUrl,
  apiPrefix,
  trimSlash,
  defaultQueryStringObject,
  headers,
}) => {
  const prefix = apiPrefix ? `${apiPrefix}/` : '';
  const buildUrl = (path, queryStringObject = {}) => {
    const queryString = `${qs.stringify({ ...defaultQueryStringObject, ...queryStringObject })}`;

    const url = trimSlash
      ? `${baseApiUrl}${prefix}`
      : `${baseApiUrl}/${prefix}`;
    if (queryString) {
      return `${url}${path}?${queryString}`;
    }
    return `${url}${path}`;
  };

  const responseHandler = (response) => {
    if (response.status >= 500) {
      return response.text()
        .then((text) => { throw new Error(text); });
    }

    const responseContentType = response.headers.get('Content-Type');
    const isJSON = responseContentType ? responseContentType.includes('application/json') : false;
    if (response.status >= 400) {
      if (isJSON) {
        return response.json()
          .then((obj) => { throw new Error(JSON.stringify(obj)); });
      }

      return response.text()
        .then((text) => { throw new Error(text); });
    }

    if (isJSON) {
      return response.json()
        .then(obj => obj);
    }
    return response.text();
  };

  const getJsonHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const postJsonHeaders = {
    ...getJsonHeaders,
    'Content-Type': 'application/json',
    ...headers,
  };

  const postFormHeaders = {
    ...headers,
  };

  const get = (path, queryStringObject) =>
    fetch(buildUrl(path, queryStringObject), { headers: getJsonHeaders })
      .then(responseHandler);

  const post = (path, queryStringObject, body) =>
    fetch(buildUrl(path, queryStringObject), {
      method: 'POST',
      headers: postJsonHeaders,
      body: JSON.stringify(body),
    })
      .then(responseHandler);

  const postForm = (path, queryStringObject, formData) => {
    return new Promise((resolve) => {
      formData.getLength((err, length) => {
        fetch(buildUrl(path, queryStringObject), {
          method: 'POST',
          headers: { ...postFormHeaders, 'Content-Length': length },
          body: formData,
        })
          .then(data => resolve(responseHandler(data)));
      });
    });
  };

  const put = (path, queryStringObject, body) =>
    fetch(buildUrl(path, queryStringObject), {
      method: 'PUT',
      headers: postJsonHeaders,
      body: JSON.stringify(body),
    })
      .then(responseHandler);

  const patch = (path, queryStringObject, body) =>
    fetch(buildUrl(path, queryStringObject), {
      method: 'PATCH',
      headers: postJsonHeaders,
      body: JSON.stringify(body),
    })
      .then(responseHandler);

  const del = (path, queryStringObject, body) =>
    fetch(buildUrl(path, queryStringObject), {
      method: 'DELETE',
      headers: postJsonHeaders,
      body: JSON.stringify(body),
    })
      .then(responseHandler);

  const postRaw = (path, queryStringObject, files) => {
    const body = new window.FormData();
    files.forEach((file, i) => {
      body.append(`file${i}`, file);
    });
    return fetch(buildUrl(path, queryStringObject), {
      method: 'POST',
      headers,
      body,
    })
      .then(responseHandler);
  };

  return {
    get,
    post,
    put,
    patch,
    del,
    postRaw,
    postForm,
  };
};
