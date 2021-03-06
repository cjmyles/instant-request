import HttpStatusCodes from 'http-status-codes';
import warning from 'warning';
import nodeFetch from 'node-fetch';

const fetch = fetch || nodeFetch;

const config = {
  verbose: false,
  errorType: 'full', // simple, *full
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch: {
    // mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include',
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
};

export default class Request {
  constructor(baseUrl, options = {}) {
    warning(baseUrl, 'Missing baseUrl');

    this.baseUrl = baseUrl;
    this.config = {
      ...config,
      ...options,
    };
  }

  responseError(response) {
    let error;
    let text = `HTTP Error ${response.status} ${response.statusText}`;
    if (this.config.errorType === 'simple') {
      error = text;
    } else {
      const error = new Error(text);
      error.status = response.statusText;
      error.response = response;
    }
    return error;
  }

  logRequest(method, url) {
    if (this.config.verbose) {
      console.info(method, url);
    }
  }

  getUrl(uri, query) {
    return (
      `${this.baseUrl}${uri}` +
      (query
        ? '?' +
          Object.keys(query)
            .reduce((a, k) => {
              a.push(k + '=' + encodeURIComponent(query[k]));
              return a;
            }, [])
            .join('&')
        : '')
    );
  }

  async fetch(method, url, data) {
    try {
      let fetchOptions = {
        ...this.config.fetch,
        method,
      };
      if (data) {
        fetchOptions.body = JSON.stringify(data);
      }
      const response = await fetch(url, fetchOptions);
      if (response.status === HttpStatusCodes.NO_CONTENT) {
        return null;
      } else if (response.status === HttpStatusCodes.NOT_FOUND) {
        throw this.responseError(response);
      } else if (
        !response.headers.has('Content-Type') ||
        !response.headers.get('Content-Type').includes('application/json')
      ) {
        throw new Error(`HTTP Error Invalid JSON response`);
      } else if (
        response.status < HttpStatusCodes.OK ||
        response.status >= HttpStatusCodes.MULTIPLE_CHOICES
      ) {
        throw this.responseError(response);
      } else {
        return await response.json();
      }
    } catch (error) {
      throw error;
    }
  }

  async get(uri, query) {
    try {
      const url = this.getUrl(uri, query);
      this.logRequest('GET', url, query);
      return await this.fetch('GET', url);
    } catch (error) {
      throw error;
    }
  }

  async post(uri, data, query) {
    try {
      const url = this.getUrl(uri, query);
      this.logRequest('POST', url, data, query);
      return await this.fetch('POST', url, data);
    } catch (error) {
      throw error;
    }
  }

  async put(uri, data, query) {
    try {
      const url = this.getUrl(uri, query);
      this.logRequest('POST', url, data, query);
      return await this.fetch('PUT', url, data);
    } catch (error) {
      throw error;
    }
  }

  async remove(uri, query) {
    try {
      const url = this.getUrl(uri, query);
      this.logRequest('DELETE', url, query);
      return await this.fetch('DELETE', url);
    } catch (error) {
      throw error;
    }
  }
}

export { Request };
