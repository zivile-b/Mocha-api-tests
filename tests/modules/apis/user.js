let utils = require('../runtime/utils');
let settings = require('../runtime/settings');
let chai = require('chai'), chaiHttp = require('chai-http');
let expect = settings.expect;
chai.use(chaiHttp);


(function () {
  let env = settings.environment;
  let data = settings.runtimeData;

  /**
  * get request example.
  */
  exports.getProfile = async function (query) {
    query = query;
    return await chai.request(env.urlApi)
      .get(`/mth/v1/users/profile${query}`)
      .set('content-type', 'application/json')
      .set('Authorization', data.global.Authorization)
      .send();
  };

   /**
  * put request example.
  */
  exports.updateUserProfile = async function () {
    return await chai.request(env.urlApi)
      .put('/mth/v1/users/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', data.global.Authorization)
      .send(
        {
            address: data.userProfile.address,
            country_code_iso: data.userProfile.country_code_iso,
            email: data.userProfile.email,
            fb_id: data.userProfile.fb_id,
            first_name: data.userProfile.first_name,
            language_code: data.userProfile.language_code,
            last_name: data.userProfile.last_name
        }
      );

      
  };

  


  


})();
