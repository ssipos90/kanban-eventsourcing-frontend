import RWebSocket from 'reconnecting-websocket';
import {url} from './index.js';

export const connect = token => new RWebSocket('ws://' + url, 'auth:' + token);
