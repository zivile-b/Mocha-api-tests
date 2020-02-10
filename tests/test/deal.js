require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let user = require('../modules/apis/user');
let deals = require('../modules/apis/deals');
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

  describe('Test deal', function () {

    it('Should be able to GET deal [GET]', async function () {

      // Given
      let postResponse = await deals.postDeal();
      data.deal.id = postResponse.body.id;

      // When
      let response = await deals.getDeal(data.deal.id);    

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('expired_at');
    });

    it('Should be able to POST deal [POST]', async function () {

      // Given
      // When
      let response = await deals.postDeal();
      data.deal.id = response.body.id;

      // Then
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.property('description');
      expect(response.body.description).to.equal('string');
      expect(response.body).to.have.property('currency');
      expect(response.body.currency).to.equal('USD');
    });

    it('Should be able to CANCEL deal [POST]', async function () {

      // Given
      // When
      let response = await deals.cancelDeal(data.deal.id);
      //console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(204);
      let responseCancelDeal = await deals.getDeal(data.deal.id);
      expect(responseCancelDeal.body).to.have.property('state');
      expect(responseCancelDeal.body.state).to.equal('CANCELLED');
    });

    it('Should be able to TRASH deal [POST]', async function () {

      // Given
      // When
      let response = await deals.trashDeal(data.deal.id);

      // Then
      expect(response.statusCode).to.equal(204);
      // let responseDeal = await deals.getDeal(data.deal.id);
      // console.log('===================');
      // console.log(responseDeal.body);
      // console.log('===================');
    });

    it('Should be able to GET users WALLET private key [GET]', async function () {

      // Given
      let walletKey = "MTIzNDU2";
      // When
      let response = await deals.getWalletPrivateKey(walletKey);

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('private_key');
      expect(response.body.private_key).to.have.property('length');
    });

  });

});