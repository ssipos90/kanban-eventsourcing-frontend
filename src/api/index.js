import * as auth from './auth.js';

const url = 'localhost:8081';

const post = (path, payload) =>
  fetch('http://' + url + path, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response =>
      response.json().then(data => ({data, status: response.status, statusText: response.statusText, ok: response.ok}))
    );

const services = {auth};

export {
  services as default,
  url,
  post
};
