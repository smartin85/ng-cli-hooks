"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("@angular-devkit/build-angular/src/browser");
const core_1 = require("@angular-devkit/core");
class BrowserBuilder extends browser_1.BrowserBuilder {
    constructor(context) {
        super(context);
        this.context = context;
    }
    buildWebpackConfig(root, projectRoot, host, options) {
        var args = [...arguments];
        if (options.optionsHook) {
            const optionsHookPath = core_1.getSystemPath(core_1.normalize(core_1.resolve(root, core_1.normalize(options.optionsHook))));
            const optionsHook = require(optionsHookPath);
            if (typeof optionsHook === 'function') {
                args[3] = optionsHook(options) || options;
            }
        }
        const config = super.buildWebpackConfig.apply(this, args);
        if (options.webpackHook) {
            const webpackPath = core_1.getSystemPath(core_1.normalize(core_1.resolve(root, core_1.normalize(options.webpackHook))));
            const webpack = require(webpackPath);
            if (typeof webpack === 'function') {
                return webpack(config, options);
            }
            if (typeof webpack === 'object') {
                return webpack;
            }
        }
        return config;
    }
}
exports.default = BrowserBuilder;
//# sourceMappingURL=index.js.map