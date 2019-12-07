import { Schema } from '@angular-devkit/build-angular/src/browser/schema';
import { Observable } from 'rxjs';
import { BuilderContext, createBuilder, BuilderOutput } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { modifyOptions, modifyWebpack, modifyIndexHtml } from '../modifiers';

export interface BrowserBuilderSchema extends Schema {
	webpackHook?: string;
	indexHtmlHook?: string;
	optionsHook?: string;
}

export function buildBrowser(
	options: BrowserBuilderSchema,
	context: BuilderContext
  ): Observable<BuilderOutput> {
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