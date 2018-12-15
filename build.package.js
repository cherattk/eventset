var fs = require('fs');

const fileEncode = 'utf8';
const srcPackageFile = 'package.json';
const destPackageFile = 'build/package.json';

// process and copy ./package.json to ./build/package.json
fs.readFile(srcPackageFile, fileEncode, function(err, data){

    if (!err){
        var obj = JSON.parse(data);
        var json = JSON.stringify(obj , function(key, value){
            if(key === 'babel' || key === 'scripts'){
                return undefined;
            }
            return value;
        } , "\t");

        fs.writeFile(destPackageFile, json, fileEncode , function(){
            console.log('Done : process and copy ./package.json to ./build/package.json');
        });

    } else {
        console.log(err);
    }
});

// copy ./README.md into ./build folder
fs.createReadStream('README.md').pipe(fs.createWriteStream('build/README.md'));
fs.createReadStream('src/index.js').pipe(fs.createWriteStream('build/index.js'));