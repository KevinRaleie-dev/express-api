require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const baseUrl = process.env.BASE_URL;

chai.use(chaiHttp);

describe("GET base /", () => {
  it("server is live", function (done) {
    chai
      .request(baseUrl)
      .get("/")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("The server is live🙂🔥");
        done();
      });
  });
});
