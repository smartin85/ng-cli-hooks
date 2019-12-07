"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@angular-devkit/build-angular/src/server");
const core_1 = require("@angular-devkit/core");
class ServerBuilder extends server_1.ServerBuilder {
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
exports.default = ServerBuilder;
//# sourceMappingURL=index.js.map