import { Schema } from '@angular-devkit/build-angular/src/extract-i18n/schema';
import i18nBuilder from '@angular-devkit/build-angular/src/extract-i18n';
import { Observable } from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { modifyOptions } from '../modifiers';
import { IHookableOptions } from '../IHookable';

type ExtractI18nSchema = IHookableOptions & Schema & json.JsonObject;

// export function serveBrowser(
// 	options: ExtractI18nSchema,
// 	context: BuilderContext
//   ): Observable<DevServerBuilderOutput> {
// 	  return i18nBuilder.handler(
// 		modifyOptions(options, context), 
// 		context
// 	  );
//   }

  
//   export default createBuilder<json.JsonObject & ExtractI18nSchema>(serveBrowser);