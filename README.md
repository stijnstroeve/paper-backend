# Paper Wrapper
Paper wrapper is a library used for being able to easily create REST API's using express, it can also be used as middleware for [express](https://www.npmjs.com/package/express).

## Goal
The goal of paper wrapper is to be able to create very easy and neat REST API's. Paper wrapper does this by wrapping around [express](https://www.npmjs.com/package/express) and using 'modules', 'module methods' and 'module requests'.

## Installation
Paper wrapper is currently available on the [NPM](https://www.npmjs.com/) registry and can be installed in your project using:
```bash
$ npm install paper-wrapper
```
or
```bash
$ yarn add paper-wrapper
```

## Examples
You can find examples on how to use paper wrapper in the [github repository](https://github.com/stijnstroeve/paper-wrapper/tree/master/examples).

## Documentation
Full documentation for paper wrapper is available at the projects's [github wiki](https://github.com/stijnstroeve/paper-wrapper/wiki). 

## Key Theories
In paper wrapper there are a couple of key theories that need to be understood beforehand so it will be easier to use:

### Module methods
The module method is the definition of the last part of an endpoint `(/api/module/method)`. The module method contains the handling of the request and sending the response.

### Modules
Modules are in fact a bunch of module methods grouped together by name. Modules can have parents so it is easy to create very specific endpoints.

### Module request
A module request is the request that is actually being made from the client. The module request contains a couple of properties that gives you more control over the request.

## Tests
To run the tests for paper wrapper you first need to install all needed npm packages using:
```bash
$ npm install
```
then
```bash
$ npm test
```
to run actually run the tests. When this command is ran all tests should pass, if not please contact the [project owner](https://github.com/stijnstroeve).

## Contribute
If you have any features that you would like to see in paper wrapper that are not currently available, please contribute to the project and create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

## License
[Apache 2.0 LICENSE](https://github.com/stijnstroeve/paper-wrapper/blob/master/LICENSE)
