var fs = require('fs');

const srcFile = 'package.json';
const dstFile = 'build/package.json';
const fileEncode = 'utf8';

fs.readFile(srcFile, fileEncode, function(err, data){

    if (!err){
        var obj = JSON.parse(data);
        var json = JSON.stringify(obj , function(key, value){
            if(key === 'babel' || key === 'scripts'){
                return undefined;
            }
            return value;
        } , "\t");

        fs.writeFile(dstFile, json, fileEncode , function(){
            console.log(' Done');
        });

    } else {
        console.log(err);
    }
});