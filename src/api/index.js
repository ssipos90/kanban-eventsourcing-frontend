import auth from './auth.js';

export default {
  auth
};

export const url = 'http://localhost:8081';

export const responseHandler = r => {
  if (r.ok) {
    return r.json();
  } else if (r.status === 422) {
    return new ValidationError(r.json());
  }
  return r.json()
    .catch(() => Promise.reject(new ServiceError({status: r.status, message: r.statusText, data: r.text()})))
    .then(payload => Promise.reject(new ServiceError(payload)));
};

export class ValidationError extends Error {
  constructor(errors) {
    super('Validation error: ' + JSON.stringify(errors));
    this.errors = errors;
  }
}

export class ServiceError extends Error {
  constructor(error) {
    super('Server error: ' + JSON.stringify(error));
    this.error = error;
  }
}
