import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("Test Module", () => {
    describe("GET /", () => {
        it("should have status 404 because it doesnt exist", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("GET /test-module/test-method", () => {
        it("should have status 200", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .query({"required-parameter": "string"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 417 because it doesnt have enough parameters", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a("object");
                    res.body.success.should.be.false;
                    res.body.error.key.should.be.equal("NOT_ENOUGH_PARAMETERS");
                    done();
                });
        });

        it("should have status 417 because it has an unknown parameter", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .query({unknown: "test"})
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a("object");
                    res.body.success.should.be.false;
                    res.body.error.key.should.be.equal("UNKNOWN_PARAMETER");
                    done();
                });
        });
    });

    describe("GET /test-module/required-number", () => {
        it("should have status 200 because the required parameter could be parsed to a number", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-number")
                .query({"required-number": 0})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 417 because the required parameter could not be parsed to a number", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-number")
                .query({"required-number": "test"})
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a("object");
                    res.body.success.should.be.false;
                    res.body.error.key.should.be.equal("DATA_PARSE");
                    done();
                });
        });
    });

    describe("GET /test-module/required-string", () => {
        it("should have status 200 because the required parameter could be parsed to a string", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-string")
                .query({"required-string": "test"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });
    });

    describe("GET /test-module/required-boolean", () => {
        it("should have status 200 because the required parameter: true could be parsed to a boolean", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({"required-boolean": true})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 200 because the required parameter: \"true\" could be parsed to a boolean", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({"required-boolean": "true"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 200 because the required parameter: \"1\" could be parsed to a boolean", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({"required-boolean": "1"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 200 because the required parameter: 1 could be parsed to a boolean", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({"required-boolean": 1})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.success.should.be.true;
                    done();
                });
        });

        it("should have status 417 because the required parameter: \"non-boolean\" could not be parsed to a boolean", (done) => {
            chai.request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({"required-boolean": "non-boolean"})
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a("object");
                    res.body.success.should.be.false;
                    res.body.error.key.should.be.equal("DATA_PARSE");
                    done();
                });
        });

        describe("Child Module", () => {
            describe("GET /test-module/child-module/child-method", () => {
                it("should have status 200 because the method exists", (done) => {
                    chai.request("http://127.0.0.1:3001")
                        .get("/test-module/child-module/child-method")
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                            res.body.success.should.be.true;
                            done();
                        });
                });
            });

        });
    });

});
