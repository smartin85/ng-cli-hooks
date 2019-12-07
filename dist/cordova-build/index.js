"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cordova_build_1 = require("@ionic/angular-toolkit/builders/cordova-build");
const rxjs_1 = require("rxjs");
const browser_1 = require("../browser");
const operators_1 = require("rxjs/operators");
class CordovaBuildBuilder extends cordova_build_1.CordovaBuildBuilder {
    run(builderConfig) {
        const [project, target, configuration] = builderConfig.options.browserTarget.split(':');
        const browserTargetSpec = { project, target, configuration, overrides: {} };
        let browserConfig = this.context.architect.getBuilderConfiguration(browserTargetSpec);
        let browserDescription;
        return rxjs_1.of(null).pipe(// tslint:disable-line:no-null-keyword
        operators_1.concatMap(() => this.context.architect.getBuilderDescription(browserConfig)), operators_1.tap(description => browserDescription = description), operators_1.concatMap(() => this.context.architect.validateBuilderOptions(browserConfig, browserDescription)), operators_1.tap(config => browserConfig = config), operators_1.tap(() => this.prepareBrowserConfig(builderConfig.options, browserConfig.options)), operators_1.concatMap(() => rxjs_1.of(new browser_1.default(this.context))), operators_1.concatMap(builder => builder.run(browserConfig)));
    }
}
exports.default = CordovaBuildBuilder;
//# sourceMappingURL=index.js.map