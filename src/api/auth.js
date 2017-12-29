import {responseHandler, url} from './index.js';

const post = (path, payload) =>
  fetch(url + path, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(responseHandler);

export default payload => post('/auth', payload);
