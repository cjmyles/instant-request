import HttpStatusCodes from 'http-status-codes';
import warning from 'warning';
import nodeFetch from 'node-fetch';

const fetch = fetch || nodeFetch;

const defaultOptions = {
  verbose: false,
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch: {
    // mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include',
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
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
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  static checkStatus(response) {
    if (response.status === HttpStatusCodes.NO_CONTENT) {
      return response;
    } else if (
      !response.headers.has('Content-Type') ||
      !response.headers.get('Content-Type').includes('application/json')
    ) {
      const error = new Error(`HTTP Error Invalid JSON response`);
      throw error;
    } else if (
      response.status < HttpStatusCodes.OK ||
      response.status >= HttpStatusCodes.MULTIPLE_CHOICES
    ) {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      throw error;
    } else {
      return response;
    }
  }

  logRequest() {
    if (this.options.verbose) {
      console.info(...arguments);
    }
  }

  getUrl(uri) {
    return `${this.baseUrl}${uri}`;
  }

  async fetch(method, url, data) {
    let options = {
      ...this.options.fetch,
      method,
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    let response = await fetch(url, options);
    response = await Request.checkStatus(response);
    return await response.json();
  }

  async get(uri) {
    try {
      const url = this.getUrl(uri);
      this.logRequest('GET', url);
      return await this.fetch('GET', url);
    } catch (error) {
      throw error;
    }
  }

  async post(uri, data) {
    try {
      const url = this.getUrl(uri);
      this.logRequest('POST', url, data);
      return await this.fetch('POST', url, data);
    } catch (error) {
      throw error;
    }
  }

  async put(uri, data) {
    try {
      const url = this.getUrl(uri);
      this.logRequest('POST', url, data);
      return await this.fetch('PUT', url, data);
    } catch (error) {
      throw error;
    }
  }

  async remove(uri) {
    try {
      const url = this.getUrl(uri);
      this.logRequest('DELETE', url);
      return await this.fetch('DELETE', url);
    } catch (error) {
      throw error;
    }
  }
}

export { Request };
