import { Observable } from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { DevServerBuilderOutput, executeDevServerBuilder, DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { modifyOptions, modifyWebpack, modifyIndexHtml } from '../modifiers';
import { IHookableOptions } from '../IHookable';

type DevServerSchema = IHookableOptions & DevServerBuilderOptions;

export function serveBrowser(
	options: DevServerSchema,
	context: BuilderContext
  ): Observable<DevServerBuilderOutput> {
	return executeDevServerBuilder(
		modifyOptions(options, context),
		context,
		{
			webpackConfiguration: modifyWebpack(options, context),
			indexHtml: modifyIndexHtml(options, context)
		}
	)
  }
  
  export default createBuilder<json.JsonObject & DevServerSchema>(serveBrowser);