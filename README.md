# ng-cli-hooks
[![MIT License][license-image]][license-url] 
[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][npm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[![Buy me a coffee][buy-me-a-coffee-image]][buy-me-a-coffee-url]

Hooks for the angular-cli

## This documentation is for version 11 only
Documentation for other versions could be found here:
- [Version 8.x.x](https://github.com/smartin85/ng-cli-hooks/blob/8.0.0/README.md)
- [Version 7.x.x](https://github.com/smartin85/ng-cli-hooks/blob/7.0.0/README.md)

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
- server

## Hooks
Currently this plugin contains three different hooks: `optionsHook`, `webpackHook` and `indexHtmlHook`.

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

### indexHtmlHook
This hook modifies the generated index.html at build-time.
It is only available for the builders `browser` and `dev-server`.

Example: `hooks/index-html.js`
```javascript
module.exports = function(content, options) {
    content = content.replace('Ionic App', 'Example App');
    return content;
}
```

### webpackHook
This hook can be used to modify the generated webpack-config of angular-cli or to replace it.

#### Modify the generated webpack-config
Example: `hooks/webpack.js`
```javascript
const StringReplacePlugin = require('string-replace-webpack-plugin');
const {AngularCompilerPlugin} = require('@ngtools/webpack/src/angular_compiler_plugin');

function replaceAngularCompilerPlugin(plugins) {
  const index = plugins.findIndex(p => p instanceof AngularCompilerPlugin);
  const options = plugins[index]._options;
  options.directTemplateLoading = false;
  plugins[index] = new AngularCompilerPlugin(options);
}

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

  /**
   * The webpack-config of Angular 8 does not have a loader for html.
   * It uses directTemplateloading. To modify the html content we have
   * to replace the AngularComplilerPlugin with directTemplateLoading
   * set to false.
  */
  generatedWebpackConfig.module.rules.unshift({
    test: /\.html$/,
    loader: 'raw-loader'
  });

  replaceAngularCompilerPlugin(generatedWebpackConfig.plugins);

  return generatedWebpackConfig;
}
```

#### Replace the generated webpack-config
If `hooks/webpack.js` exports a webpack-config-object, than the generated webpack-config will be replaced by your own.

## Ionic 4
Since version 8.0.0 you don´t need the ng-cli-hooks:cordova-build builder anymore because ionic uses the builder you specified at architect.build or architect.serve. 

## Changelog
### 11.0.0
- Support for Angular 11
### 8.0.0
- Support for Angular 8
- Removed builders for `extract-i18n` and `cordova-build`
- Added `indexHtmlHook` to hook into the index.html build.

### 7.0.0
- Major version of ng-cli-hooks now equals the Angular version (use ng-cli-hooks@7.x.x to work with Angular 7.x.x)

### 1.1.0
- added `ng-cli-hooks:cordova-build` for Ionic 4 projects.

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-image]: https://badge.fury.io/js/ng-cli-hooks.svg
[npm-url]: https://www.npmjs.com/package/ng-cli-hooks

[downloads-image]: https://img.shields.io/npm/dt/ng-cli-hooks.svg

[snyk-image]: https://snyk.io/test/github/smartin85/ng-cli-hooks/badge.svg
[snyk-url]: https://snyk.io/test/github/smartin85/ng-cli-hooks

[buy-me-a-coffee-image]: https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png
[buy-me-a-coffee-url]: https://www.buymeacoffee.com/smartin