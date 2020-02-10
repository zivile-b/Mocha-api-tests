require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let user = require('../modules/apis/user');
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('INTEGRATION API TESTS', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  after("Data cleanup.", function () {
  });

  describe('Test user profile', function () {

    it('Should be able to get user profile', async function () {
      // Given
      const query = '';
      // When
      let response = await user.getProfile(query);
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('last_name');
    });

    it('Should be able to update user profile', async function () {

      // Given
      data.userProfile.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
      
      // When
      let response = await user.updateUserProfile();
      
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('first_name');
      expect(response.body.first_name).to.equal(data.userProfile.first_name);
    });

    it('Should not be able to update user profile when name is invalid', async function () {

      // Given
      data.userProfile.first_name = utils.randomName(7);

      // When
      let response = await user.updateUserProfile();

      // Then
            
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('INVALID_FIRST_NAME');
      expect(response.body.message).to.equal('(605) first_name in body should match \'only letters\'');
      // expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    });

    it('Should no be able to update user profile when last name is invalid', async function () {

      // Given
      data.userProfile.first_name = "zivile";
      data.userProfile.last_name = "qwertyuiop[]asdfghjkl";

      // When
      let response = await user.updateUserProfile();

      // Then    
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('INVALID_LAST_NAME');
      expect(response.body.message).to.equal("(605) last_name in body should match 'only letters'");
    });

    it('Should no be able to update user profile when contry code is invalid', async function () {
      // Given
      data.userProfile.last_name = "zivile"
      data.userProfile.country_code_iso = "5";
      // When
      let response = await user.updateUserProfile();

      // Then
      
      expect(response.statusCode).to.equal(400);
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal("not valid country code ISO");
    });

    it('Should no be able to update user profile when language code is invalid', async function () {

      // Given
      data.userProfile.country_code_iso = "LT";
      data.userProfile.language_code = "qwerty34567890-09876543uiopsdfghjkl";

      // When
      let response = await user.updateUserProfile();

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(603) language_code in body should be at most 2 chars long');
    });

  });
  
});
