import { BuilderContext } from "@angular-devkit/architect";
import { IHookableOptions } from "./IHookable";
import { getSystemPath, normalize } from "@angular-devkit/core";
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/angular-cli-files/utilities/index-file/write-index-html';
import { Configuration } from 'webpack';


export function modifyOptions<T extends IHookableOptions>(options: T, context: BuilderContext): T {
    if(options.optionsHook) {
        const optionsHookPath = `${getSystemPath(normalize(context.workspaceRoot))}/${options.optionsHook}`;
        const optionsHook = require(optionsHookPath);
        if(typeof optionsHook === 'function') {
            options = optionsHook(options) || options;
        }
    }
    return options;
}

export function modifyWebpack(options: IHookableOptions, context: BuilderContext): ExecutionTransformer<Configuration> {
	return async (angularWebpackConfig: Configuration) => {
        let webpackConfig: Configuration = angularWebpackConfig;
        if(options.webpackHook) {
			const webpackHookPath = `${getSystemPath(normalize(context.workspaceRoot))}/${options.webpackHook}`;
			const webpackHook = require(webpackHookPath);
			if(typeof webpackHook === 'function') {
				webpackConfig = await webpackHook(webpackConfig, options) || webpackConfig;
			}
			if (typeof webpackHook === 'object') {
				webpackConfig = webpackHook;
			}
		}
		return webpackConfig;
	};
}

export function modifyIndexHtml(options: IHookableOptions, context: BuilderContext): IndexHtmlTransform {
	return async (content: string) => {
		if(options.indexHtmlHook) {
			const indexHtmlHookPath = `${getSystemPath(normalize(context.workspaceRoot))}/${options.optionsHook}`;
			const indexHtmlHook = require(indexHtmlHookPath);
			if(typeof indexHtmlHook === 'function') {
				content = await indexHtmlHook(content, options) || content;
			}
		}
		return content;
	}
}
