import axios, {CancelToken} from 'axios';
import {Storage} from '../utils';
import {BASE_URL} from './config';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

/**Function to log network errors in console */
const networkErrorLogger = async (
  e,
  URL,
  PAYLOAD,
  CONFIG,
  isAuthenticated = true,
) => {
  console.info(`CONFIG: ${JSON.stringify(CONFIG)}`);
  console.info(`Requested URL: ${URL}`);
  console.info(`PAYLOAD : ${JSON.stringify(PAYLOAD)}`);
  console.info(JSON.stringify(e?.message));
  if (axios.isCancel(e)) {
    logError('Request cancelled', URL);
    throw e?.message;
  }
  if (typeof e === 'string') {
    logError(`Failed: ${URL} (no status code)`, e);
    throw e;
  }
  if (e?.message === 'Network Error') {
    throw 'Network Error. Ensure you are connected to internet.';
  }
  const {status, data} = e?.response;
  if (isAuthenticated && status === 401) {
    await Storage.logOut();
    setTimeout(() => reset(), 100);
    throw TOKEN_ERR;
  }
  const {error, metadata} = data;
  if (typeof error === 'string') {
    logError(`Failed: ${URL} (${status})`, error);
    if (metadata) {
      throw {error, metadata};
    }
    throw error;
  }
  if (status !== 429) {
    throw '';
  }
  logError(`Failed: ${URL} (${status})`, 'Something went wrong');
  throw 'Something went wrong';
};

/* Function to add access and id token to requests*/
const setUpConfig = async () => {
  try {
    const result = await checkTokenExpiry();
    if (!result) {
      return false;
    }
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    return false;
  }
};

const setUpMultipartConfig = async () => {
  try {
    // await checkTokenExpiry();
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    console.log('Error Setting Config');
  }
};

// Function for GET requests
const get = async (URL, isAuthenticated = true, params = {}, cancelToken) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      result = await axiosInstance.get(URL, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
        cancelToken,
      });
    } else {
      result = await axiosInstance.get(URL, {params});
    }
    return result.data;
  } catch (e) {
    await networkErrorLogger(e, URL, 'nil', CONFIG);
  }
};

export {get};
