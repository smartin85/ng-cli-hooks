import { Observable, from } from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { DevServerBuilderOutput, executeDevServerBuilder, DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { modifyOptions, modifyWebpack, modifyIndexHtml } from '../modifiers';
import { IHookableOptions } from '../IHookable';
import { getTargetOptions } from '../utils';
import { switchMap } from 'rxjs/operators';

type DevServerSchema = IHookableOptions & DevServerBuilderOptions;

export function serveBrowser(
	options: DevServerSchema,
	context: BuilderContext
): Observable<DevServerBuilderOutput> {
	return from(getTargetOptions(options, context))
		.pipe(
			switchMap(targetOptions =>
				executeDevServerBuilder(
					modifyOptions({...options, ...targetOptions}, context),
					context,
					{
						webpackConfiguration: modifyWebpack(targetOptions, context),
						indexHtml: modifyIndexHtml(targetOptions, context)
					}
				)
			)
		);
}

export default createBuilder<json.JsonObject & DevServerSchema>(serveBrowser);