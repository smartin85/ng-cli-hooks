import {CordovaBuildBuilder as Original, CordovaBuildBuilderSchema} from '@ionic/ng-toolkit/src/cordova-build';
import { BuilderConfiguration, BuildEvent } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import BrowserBuilder from '../browser';
import { concatMap } from 'rxjs/operators';

export default class CordovaBuildBuilder extends Original {
	run(builderConfig: BuilderConfiguration<CordovaBuildBuilderSchema>): Observable<BuildEvent> {
		const browserBuilder = new BrowserBuilder(this.context); // TODO: shouldn't this use `architect.getBuilder()`?
	
		return this.buildBrowserConfig(builderConfig.options).pipe(
		  concatMap(browserConfig => browserBuilder.run(browserConfig))
		);
	  }
}