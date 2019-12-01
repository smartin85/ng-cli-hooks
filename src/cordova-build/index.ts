import {CordovaBuildBuilder as Original, CordovaBuildBuilderSchema} from '@ionic/angular-toolkit/builders/cordova-build';
import {BuilderConfiguration, BuilderDescription, BuildEvent} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import BrowserBuilder from '../browser';
import { concatMap, tap } from 'rxjs/operators';
import {BrowserBuilderSchema} from '@angular-devkit/build-angular';

export default class CordovaBuildBuilder extends Original {
	run(builderConfig: BuilderConfiguration<CordovaBuildBuilderSchema>): Observable<BuildEvent> {

		const [ project, target, configuration ] = builderConfig.options.browserTarget.split(':');
		const browserTargetSpec = { project, target, configuration, overrides: {} };

		let browserConfig = this.context.architect.getBuilderConfiguration<BrowserBuilderSchema>(browserTargetSpec);
		let browserDescription: BuilderDescription;

		return of(null).pipe(// tslint:disable-line:no-null-keyword
			concatMap(() => this.context.architect.getBuilderDescription(browserConfig)),
			tap(description => browserDescription = description),
			concatMap(() => this.context.architect.validateBuilderOptions(browserConfig, browserDescription)),
			tap(config => browserConfig = config),
			tap(() => this.prepareBrowserConfig(builderConfig.options, browserConfig.options)),
			concatMap(() => of(new BrowserBuilder(this.context))),
			concatMap(builder => builder.run(browserConfig))
		);
	}
}
