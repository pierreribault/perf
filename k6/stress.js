import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // below normal load
    { duration: '2m', target: 100 },
    { duration: '30s', target: 200 }, // normal load
    { duration: '2m', target: 200 },
    { duration: '30s', target: 300 }, // around the breaking point
    { duration: '2m', target: 300 },
    { duration: '30s', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 400 },
    { duration: '30s', target: 500 }, // beyond the breaking point
    { duration: '2m', target: 500 },
    { duration: '30s', target: 0 }, // scale down. Recovery stage.
  ],
};

const BASE_URL = __ENV.APP_HOST;
const EMAIL = 'test@test.fr';
const PASSWORD = 'password';

let cookies = {}

function setCookies(resp) {
  cookies = {}

  for (const respKey in resp.cookies) {
    cookies[respKey] = resp.cookies[respKey][0].value
  }
}

function requestLoginParams() {
  return {
    headers: {
      'Accept': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(cookies['XSRF-TOKEN']),
      'Content-Type': 'application/json',
    },
    cookies: cookies
  }
}

function requestParams() {
  return {
    headers: {
      'Accept': 'application/json',
      'Referer': 'localhost:3000',
    },
    cookies: cookies
  }
}

function generateXsrf() {
  let xsrfRes = http.get(`${BASE_URL}/sanctum/csrf-cookie`);

  check(xsrfRes, {
    'Obtain xsrf cookie': (resp) => {
      setCookies(resp)

      return resp.status === 204
    },
  })
}

function logging(email, password) {
  let loginRes = http.post(`${BASE_URL}/login/`, JSON.stringify({
    email: email,
    password: password,
  }), requestLoginParams());

  check(loginRes, {
    'Logged successfully': (resp) => {
      setCookies(resp)

      return resp.status === 204
    }
  });
}

export default () => {

  generateXsrf()
  logging(EMAIL, PASSWORD)


  let userReq = http.get(`${BASE_URL}/api/user`, requestParams());

  check(userReq, {
    'Retrieve user data': (resp) => {
      if (resp.status !== 200) {
        console.log(resp.body)
      }

      return resp.status === 200
    }
  });

  let fakeReq = http.get(`${BASE_URL}/api/fake`, requestParams());

  check(fakeReq, {
    'Retrieve fake data': (resp) => resp.status === 200
  });

  let fakeAllReq = http.get(`${BASE_URL}/api/fake/all`, requestParams());

  check(fakeAllReq, {
    'Retrieve fake all data': (resp) => resp.status === 200
  });

  sleep(1);
};
