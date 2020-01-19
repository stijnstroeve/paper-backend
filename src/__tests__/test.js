"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var chai_http_1 = require("chai-http");
chai_1["default"].use(chai_http_1["default"]);
chai_1["default"].should();
describe("Test Module", function () {
    describe("GET /", function () {
        it("should have status 404 because it doesnt exist", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/")
                .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
        });
    });
    describe("GET /test-module/test-method", function () {
        it("should have status 200", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .query({ "required-parameter": "string" })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 417 because it doesnt have enough parameters", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .end(function (err, res) {
                res.should.have.status(417);
                res.body.should.be.a("object");
                res.body.success.should.be["false"];
                res.body.error.key.should.be.equal("NOT_ENOUGH_PARAMETERS");
                done();
            });
        });
        it("should have status 417 because it has an unknown parameter", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/test-method")
                .query({ unknown: "test" })
                .end(function (err, res) {
                res.should.have.status(417);
                res.body.should.be.a("object");
                res.body.success.should.be["false"];
                res.body.error.key.should.be.equal("UNKNOWN_PARAMETER");
                done();
            });
        });
    });
    describe("GET /test-module/required-number", function () {
        it("should have status 200 because the required parameter could be parsed to a number", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-number")
                .query({ "required-number": 0 })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 417 because the required parameter could not be parsed to a number", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-number")
                .query({ "required-number": "test" })
                .end(function (err, res) {
                res.should.have.status(417);
                res.body.should.be.a("object");
                res.body.success.should.be["false"];
                res.body.error.key.should.be.equal("DATA_PARSE");
                done();
            });
        });
    });
    describe("GET /test-module/required-string", function () {
        it("should have status 200 because the required parameter could be parsed to a string", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-string")
                .query({ "required-string": "test" })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
    });
    describe("GET /test-module/required-boolean", function () {
        it("should have status 200 because the required parameter: true could be parsed to a boolean", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({ "required-boolean": true })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 200 because the required parameter: \"true\" could be parsed to a boolean", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({ "required-boolean": "true" })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 200 because the required parameter: \"1\" could be parsed to a boolean", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({ "required-boolean": "1" })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 200 because the required parameter: 1 could be parsed to a boolean", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({ "required-boolean": 1 })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.success.should.be["true"];
                done();
            });
        });
        it("should have status 417 because the required parameter: \"non-boolean\" could not be parsed to a boolean", function (done) {
            chai_1["default"].request("http://127.0.0.1:3001")
                .get("/test-module/required-boolean")
                .query({ "required-boolean": "non-boolean" })
                .end(function (err, res) {
                res.should.have.status(417);
                res.body.should.be.a("object");
                res.body.success.should.be["false"];
                res.body.error.key.should.be.equal("DATA_PARSE");
                done();
            });
        });
        describe("Child Module", function () {
            describe("GET /test-module/child-module/child-method", function () {
                it("should have status 200 because the method exists", function (done) {
                    chai_1["default"].request("http://127.0.0.1:3001")
                        .get("/test-module/child-module/child-method")
                        .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.success.should.be["true"];
                        done();
                    });
                });
            });
        });
    });
});
