import { ServerBuilder as Original } from '@angular-devkit/build-angular/src/server';
import { Path, resolve, getSystemPath, normalize } from '@angular-devkit/core';
import { BuilderContext } from '@angular-devkit/architect';
import { BuildWebpackServerSchema } from '@angular-devkit/build-angular/src/server/schema';


export interface ExtendedNormalizedServerBuilderSchema extends BuildWebpackServerSchema {
	webpackHook: string;
	optionsHook: string;
}

export default class ServerBuilder extends Original {
	constructor(public context: BuilderContext) {
		super(context);
	}

	buildWebpackConfig(
		root: Path,
		projectRoot: Path,
		host: any,
		options: ExtendedNormalizedServerBuilderSchema
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
