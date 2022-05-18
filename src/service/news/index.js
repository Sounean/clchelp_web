import {get, put} from '../index';
import * as api from '../../service/api';

export function newsList(params) {
    return get(api.api.newsList)(params);
}