# ng-cli-hooks
[![MIT License][license-image]][license-url] 
[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][npm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[![Buy me a coffee][buy-me-a-coffee-image]][buy-me-a-coffee-url]

Hooks for the angular-cli

> Unfortunately I don't have much time to take care of this project, so please contribute when new versions of Angular are released.
> As an alternative to this package, I recommend taking a look at the [angular-builders](https://github.com/just-jeb/angular-builders) repo. They are much faster when new Angular versions are released.

## This documentation is for version 15 only
Documentation for other versions could be found here:
- [Version 13.x.x](https://github.com/smartin85/ng-cli-hooks/blob/13.0.0/README.md)
- [Version 11.x.x](https://github.com/smartin85/ng-cli-hooks/blob/11.0.0/README.md)
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
            "indexHtmlHook": "hooks/index-html.js",
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
module.exports = function (options) {
    if (process.env.APP_BRANDING) {
        var branding = process.env.APP_BRANDING.trim();
        if (options.assets) {
            options.assets = options.assets.map(asset => {
                if (asset.input === 'src/assets') {
                    asset.input = `src/branding/${branding}/assets`;
                }
                return asset;
            });
        }
    }

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
During the development of this hook it may be necessary to clear the Angular cache.

Example: `hooks/webpack.js`
```javascript
function replaceAngularCompilerPlugin(plugins) {
  const plugin = plugins.find(p => p.pluginOptions && p.pluginOptions.directTemplateLoading);
  const options = plugin.pluginOptions;
  options.directTemplateLoading = false;
}

module.exports = function (generatedWebpackConfig, options) {  
  generatedWebpackConfig.module.rules.unshift({
    test: /\.html$/,
    loader: 'string-replace-loader',
    options: {
        search: /Welcome/ig,
        replace: () => 'Welcome to ng-cli-hooks',
        flags: 'g'
    }
  });

  replaceAngularCompilerPlugin(generatedWebpackConfig.plugins);

  return generatedWebpackConfig;
}
```

#### Replace the generated webpack-config
If `hooks/webpack.js` exports a webpack-config-object, than the generated webpack-config will be replaced by your own.

## Changelog
### 15.0.0
- Support for Angular 15
### 13.0.0
- Support for Angular 13
### 12.0.0
- Support for Angular 12
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