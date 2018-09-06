var fs = require('fs-extra'),
	defaultsDeep = require('lodash/defaultsDeep'),
	schemas = [
		'browser',
		'dev-server',
		'extract-i18n',
		'server'
	];

function createModifiedSchema(name) {
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

schemas.forEach(s => createModifiedSchema(s));