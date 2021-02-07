import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { executeBrowserBuilder, BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { modifyOptions, modifyWebpack, modifyIndexHtml } from '../modifiers';

export interface BrowserBuilderSchema extends BrowserBuilderOptions {
	webpackHook?: string;
	indexHtmlHook?: string;
	optionsHook?: string;
}

export function buildBrowser(
	options: BrowserBuilderSchema,
	context: BuilderContext
  ): ReturnType<typeof executeBrowserBuilder> {
	return executeBrowserBuilder(
		modifyOptions(options, context), 
		context, 
		{
			webpackConfiguration: modifyWebpack(options, context),
			indexHtml: modifyIndexHtml(options, context)
		}
	);
  }
  
  export default createBuilder<json.JsonObject & BrowserBuilderSchema>(buildBrowser);