var rootPath = process.cwd();
    fs = require('fs'),
	path = require('path'),	
	defaultsDeep = require('lodash/defaultsDeep'),
	angularSchemas = [
		'browser',
		'dev-server',
		'server'
	];

function createModifiedAngularSchema(name) {
    const original = require(`@angular-devkit/build-angular/src/${name}/schema.json`),
        modifications = require(`./src/${name}/schema.json`);
        
    createSchema(name, original, modifications);		
}

function createSchema(name, original, modifications) {
    const result = defaultsDeep(original, modifications),
        dest = path.resolve(rootPath, `./dist/${name}`),
        data = JSON.stringify(result, null, 2);

    if(fs.existsSync(dest)) {
        fs.writeFile(`${dest}/schema.json`, data, err => {
            if(err) {
                throw err;
            }
            console.log(`Created ${dest}/schema.json`);
        });        
    } else {
        console.log(`Path does not exist: ${dest}`);
    }
}

angularSchemas.forEach(s => createModifiedAngularSchema(s));
