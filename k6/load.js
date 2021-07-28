import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '4m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '2m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration{type:normal}': ['p(95)<3600'], // 99% of requests must complete below 1.5s,
    'http_req_duration{type:slow}': ['p(95)<4000'], // 99% of requests must complete below 1.5s,
  },
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

function requestLoginParams(tags) {
  return {
    headers: {
      'Accept': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(cookies['XSRF-TOKEN']),
      'Content-Type': 'application/json',
    },
    cookies: cookies,
    tags: { type: tags },
  }
}

function requestParams(tags) {
  return {
    headers: {
      'Accept': 'application/json',
      'Referer': 'localhost:3000',
    },
    cookies: cookies,
    tags: { type: tags },
  }
}

function generateXsrf() {
  let xsrfRes = http.get(`${BASE_URL}/sanctum/csrf-cookie`, { tags: { type: 'normal' }});

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
  }), requestLoginParams('normal'));

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


  let userReq = http.get(`${BASE_URL}/api/user`, requestParams('normal'));

  check(userReq, {
    'Retrieve user data': (resp) => {
      if (resp.status !== 200) {
        console.log(resp.body)
      }

      return resp.status === 200
    }
  });

  let fakeReq = http.get(`${BASE_URL}/api/fake`, requestParams('normal'));

  check(fakeReq, {
    'Retrieve fake data': (resp) => resp.status === 200
  });

  let fakeAllReq = http.get(`${BASE_URL}/api/fake/all`, requestParams('slow'));

  check(fakeAllReq, {
    'Retrieve fake all data': (resp) => resp.status === 200
  });

  sleep(1);
};
