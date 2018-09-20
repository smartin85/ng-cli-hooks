var fs = require('fs-extra'),
	defaultsDeep = require('lodash/defaultsDeep'),
	angularSchemas = [
		'browser',
		'dev-server',
		'extract-i18n',
		'server'
	],
	ionicSchemas = [
		'cordova-build'
	];

function createModifiedAngularSchema(name) {
	var original = require(`./node_modules/@angular-devkit/build-angular/src/${name}/schema.json`),
		modifications = require(`./src/${name}/schema.json`),
		result = defaultsDeep(original, modifications),
		dest = `./dist/${name}/schema.json`;

	fs.writeJson(dest, result, err => { 
		if(err) {
			throw new Error('Cannot create schema for ' + name);
		}		
	});
}

function createModifiedIonicSchema(name) {
	var original = require(`./node_modules/@ionic/ng-toolkit/src/${name}/schema.json`),
		modifications = require(`./src/${name}/schema.json`),
		result = defaultsDeep(original, modifications),
		dest = `./dist/${name}/schema.json`;

	fs.writeJson(dest, result, err => { 
		if(err) {
			throw new Error('Cannot create schema for ' + name);
		}		
	});
}

angularSchemas.forEach(s => createModifiedAngularSchema(s));
ionicSchemas.forEach(s => createModifiedIonicSchema(s));