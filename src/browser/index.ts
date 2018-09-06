import { BrowserBuilder as Original, NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser';
import { BuilderContext } from '@angular-devkit/architect';
import { Path, resolve, getSystemPath, normalize } from '@angular-devkit/core';

export interface ExtendedNormalizedBrowserBuilderSchema extends NormalizedBrowserBuilderSchema {
	webpackHook?: string;
	optionsHook?: string;
}

export default class BrowserBuilder extends Original {
	constructor(public context: BuilderContext) {
		super(context);
	}

	buildWebpackConfig(
		root: Path,
		projectRoot: Path,
		host: any,
		options: ExtendedNormalizedBrowserBuilderSchema
	) {
		var args = [...arguments];
		if (options.optionsHook) {
			const optionsHookPath = getSystemPath(normalize(resolve(root, normalize(options.optionsHook))));
			const optionsHook = require(optionsHookPath);
			if (typeof optionsHook === 'function') {
				args[3] = optionsHook(options) || options;
			}
		}

		const config = super.buildWebpackConfig.apply(this, args);

		if (options.webpackHook) {
			const webpackPath = getSystemPath(normalize(resolve(root, normalize(options.webpackHook))));
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
