import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { buildCordova} from '@ionic/angular-toolkit/builders/cordova-build';
import { CordovaBuildBuilderSchema } from '@ionic/angular-toolkit/builders/cordova-build/schema';
import { modifyOptions } from '../modifiers';
import { IHookableOptions } from '../IHookable';

type CordovaBuildSchema = IHookableOptions & CordovaBuildBuilderSchema;

export function buildIonic(
	options: CordovaBuildSchema,
	context: BuilderContext
  ) {
	  return buildCordova(
		  modifyOptions(options, context),
		  context
	  );
  }
  
  export default createBuilder<json.JsonObject & CordovaBuildSchema>(buildIonic);