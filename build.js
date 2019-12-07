var fs = require('fs-extra'),
	path = require('path'),
	rootPath = path.dirname(require.main.filename || process.mainModule.filename),
	defaultsDeep = require('lodash/defaultsDeep'),
	angularSchemas = [
		'browser',
		'dev-server',
		'extract-i18n',
		'server'
	],
	ionicSchemas = [
		'cordova-build'
	],
	jsonOptions = {
		spaces: '\t'
	};

function createModifiedAngularSchema(name) {
	var original = require(`${rootPath}/node_modules/@angular-devkit/build-angular/src/${name}/schema.json`),
		modifications = require(`./src/${name}/schema.json`),
		result = defaultsDeep(original, modifications),
		dest = `./dist/${name}/schema.json`;

	fs.writeJson(dest, result, jsonOptions, err => { 
		if(err) {
			throw new Error('Cannot create schema for ' + name);
		}		
	});
}

function createModifiedIonicSchema(name) {
	var original = require(`${rootPath}/node_modules/@ionic/angular-toolkit/builders/cordova-build/schema.json`),
		modifications = require(`./src/${name}/schema.json`),
		result = defaultsDeep(original, modifications),
		dest = `./dist/${name}/schema.json`;

	fs.writeJson(dest, result, jsonOptions, err => { 
		if(err) {
			throw new Error('Cannot create schema for ' + name);
		}		
	});
}
console.log('root path:', rootPath);
console.log('parent', module.parent);
angularSchemas.forEach(s => createModifiedAngularSchema(s));
ionicSchemas.forEach(s => createModifiedIonicSchema(s));
