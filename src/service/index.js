import {url} from './api'
import {userList, updateUser} from './user';
import {categoryList, removeCategory, addCategory} from './category';
import {getConfig,updateConfig} from './config'
import {newsList} from './news'

export default {
    userList,
    updateUser,
    categoryList,
    removeCategory,
    addCategory,
    getConfig,
    updateConfig: updateConfig,
    newsList
};
const AUTH_TOKEN = 'MTU5Mjg1MDg3NDcwNw==';

/*把传进来的api（即path和url进行拼接，最后再heard里去加上params）*/
export function get(api) {
    return params => fetch(buildParams(url + api, params),
        {
            headers: {
                'auth-token': AUTH_TOKEN
            }
        }
    )
}

export function put(api) {
    /**
     * 第一个参数为body参数，第二个参数为URL path或查询参数
     */
    return params => {
        const formData = new FormData();
        Object.entries(params).forEach(([k, v]) => {
            formData.append(k, v);
        });
        return queryParams => fetch(buildParams(url + api, queryParams),
            {
                method: 'PUT',
                body: formData,
                headers: {
                    'auth-token': AUTH_TOKEN
                }
            });
    }
}

export function del(api) {
    return queryParams => fetch(buildParams(url + api, queryParams), {
        method: 'DELETE',
        headers: {
            'auth-token': AUTH_TOKEN
        }
    });
}

export function post(api) {
    /**
     * 第一个参数作为body参数，第二个参数作为URL path或者查询参数
     * fetch函数内表示方法是post，body是json数据，headrs是加了验证的
     */
    return params => {
        return queryParams => fetch(buildParams(url + api, queryParams),
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'content-type': 'application/json',
                    'auth-token': AUTH_TOKEN
                }
            }
        )
    }
}

function buildParams(url, params = {}) {
    let newUrl = new URL(url);
    if (typeof params === 'object') {
        Object.keys(params).forEach(key => {
            newUrl.searchParams.append(key, params[key]);
        });
        return newUrl.toString();
    } else {
        //适配path参数
        return url.endsWith("/") ? url + params : url + "/" + params;
    }
}
