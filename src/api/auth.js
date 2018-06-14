import {post} from './index.js';

const login = payload => post('/auth', payload);

export {login};
