import { Observable } from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { ServerBuilderOptions, executeServerBuilder, ServerBuilderOutput } from '@angular-devkit/build-angular';
import { modifyOptions, modifyWebpack } from '../modifiers';
import { IHookableOptions } from '../IHookable';

type ServerSchema = IHookableOptions & ServerBuilderOptions;

export function server(
	options: ServerSchema,
	context: BuilderContext
  ): Observable<ServerBuilderOutput> {
	return executeServerBuilder(
		modifyOptions(options, context),
		context,
		{
			webpackConfiguration: modifyWebpack(options, context)
		}
	)
  }
  
  export default createBuilder<json.JsonObject & ServerSchema>(server);