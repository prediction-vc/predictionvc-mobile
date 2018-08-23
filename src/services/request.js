import queryString from 'query-string';
import { LOCAL_CONFIG } from '../../config';
import { Preferences, JWT_TOKEN } from './preferences';

export async function request(_url, { authorize, method, body, store }) {
  let url = _url;
  if (!url || !method) {
    throw new Error('Missing method param(s), url or method');
  }
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (authorize) {
    const jwt = await Preferences.getItem(JWT_TOKEN);
    if (jwt) {
      body = {
        ...body,
        token: jwt,
      }
    } else {
      throw new Error('Missing JWT Authorization Header');
    }
  }

  if ((method === 'post' || method === 'put' || method === 'delete') && body) {
    options.body = JSON.stringify(body);
  } else if (method === 'get' && body) {
    url += `?${queryString.stringify(body)}`;
  }

  const baseUrl = LOCAL_CONFIG.API_URL;
  const response = await fetch(`${baseUrl}/${url}`, options);
  const result = await response.json();
  const { success, reason } = result;
  if (result.hasOwnProperty('success')) {
    if (!success) {
      throw reason;
    }
  }

  if (store) {
    if (store === JWT_TOKEN && result.token) {
      const storageValue = typeof result.token === 'string' ? result.token : JSON.stringify(result.token);
      Preferences.setItem(store, storageValue).then();
    } else if (store !== JWT_TOKEN) {
      Preferences.setItem(store, result).then();
    }
  }
  return result;
}

export async function get(url, params) {
  return request(url, {
    ...params,
    method: 'get',
  });
}

export async function post(url, params) {
  return request(url, {
    ...params,
    method: 'post',
  });
}

export async function put(url, params) {
  return request(url, {
    ...params,
    method: 'put',
  });
}

export async function remove(url, params) {
  return request(url, {
    ...params,
    method: 'delete',
  });
}
