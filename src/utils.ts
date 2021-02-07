import { targetFromTargetString, BuilderContext } from "@angular-devkit/architect";
import { JsonObject } from "@angular-devkit/core";

export async function getTargetOptions(options, context: BuilderContext) {
    const browserTarget = targetFromTargetString(options.browserTarget);
    return (context.getTargetOptions(browserTarget) as unknown) as JsonObject;
}