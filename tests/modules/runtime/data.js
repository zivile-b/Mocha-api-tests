let utils = require('./utils');

(function () {
  // define global data and default values - subject to change during runtime
  let data = {
    global: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODIzOTUwNzcsImlhdCI6MTU3OTcxNjY3NywibmJmIjoxNTc5NzE2Njc3LCJpZCI6NjQ4MiwibWlkIjoxMzE1NiwiY2lkIjo2NjM0NiwiZGV2X2lkIjoic3RyaW5nIn0.c6HhQCnjJ8GjRXH0_OhpTpbGD_r46G-RUy5rxdeW-8E'
    },
    pm: {
      id: null,
      email: utils.randomEmail(),
      first_name: null,
      last_name: null,
      address: null,
      date_stamp: utils.getDateStamp(),
      time_stamp: utils.getTimeStamp(),
      string: utils.randomString(256, 'ĄČĘĖĮŠŲŪŽąčęėįšųūžzxcvbnmlkjhgfdsaqwertyuiop`1234567890-=~!@#$%^&*()_+[]\;\',./<>?:{}|\"'),
    },
    userProfile: {
      address: 'string',
      country_code_iso: 'LT',
      email: 'user@example.com',
      fb_id: 'string',
      first_name: 'kaktusas',
      language_code: 'st',
      last_name: 'string'
    },
    deal: {
      id: null,
      condition: 'used',
      description: 'string',
      expired_at: '2021-12-04T17:43:29Z',
      from: '2019-12-04T17:43:29Z',
      is_defected: true,
      note_to_seller: 'string',
      order_id: 0,
      to: '2021-12-04T17:43:29Z',
      warranty_until: '2021-12-04T17:43:29Z',
      currency: 'USD',
      title: 'string',
      total: 0.01,
      buyer_id: '9e600906-c972-4ff8-b7d8-780d1a344573',
      deal_type: 'goods',
      seller_id: 'abcc4d88-a927-4cde-aece-d5ac33865ac8',
      
    }

  };
  exports.getDefaultEmptyValue = function () {
    return null;
  };
  exports.getAll = function () {
    return data;
  };
})();
