# ng-cli-hooks
[![MIT License][license-image]][license-url] 
[![npm version][npm-image]][npm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

Hooks for the angular-cli

## Getting Started
Install the package:
```
npm install --save-dev ng-cli-hooks
```

Update your `angular.json` file:

```json
{
  ...
  "projects": {
    "app": {
      ...
      "architect": {
        "build": {
          "builder": "ng-cli-hooks:browser",
          "options": {
            "optionsHook": "hooks/options.js",
            "webpackHook": "hooks/webpack.js",
            ...
```

This Plugin contains hookable builders for
- browser
- dev-server
- extract-i18n
- server

## Hooks
Currently this plugin contains two different hooks: `optionsHook` and `webpackHook`.

### optionsHook
This hook modifies the options for the builder at build-time.

Example: `hooks/options.js`
```javascript
module.exports = function(options) {
  options.assets = options.assets.map(asset => {
    if(asset.input === 'src/assets') {
      asset.input = `branding/${process.env.APP_BRANDING}/assets`;
    }
    return asset;
  });
  return options;
}
```

### webpackHook
This hook can be used to modify the generated webpack-config of angular-cli or to replace it.

#### Modify the generated webpack-config
Example: `hooks/webpack.js`
```javascript
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = function (generatedWebpackConfig, options) {
  generatedWebpackConfig.module.rules.push({
    test: /\.html$/,
    loader: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: /Hello World/ig,
          replacement: function () {
            return 'Hello Angular'
          }
        }
      ]
    })
  });
  return generatedWebpackConfig;
}
```

#### Replace the generated webpack-config
If `hooks/webpack.js` exports a webpack-config-object, than the generated webpack-config will be replaced by your own.

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-image]: https://badge.fury.io/js/ng-cli-hooks.svg
[npm-url]: https://badge.fury.io/js/ng-cli-hooks

[snyk-image]: https://snyk.io/test/github/smartin85/ng-cli-hooks/badge.svg
[snyk-url]: https://snyk.io/test/github/smartin85/ng-cli-hooks