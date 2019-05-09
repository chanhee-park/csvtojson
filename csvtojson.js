/*
    npm start "CSV filename" "JSON filename"
    - Filename must be a relative path.
    - JSON filename is optional.
*/

const fs = require('fs');
var path = require('path');
const _ = require('lodash');

// get file dir
if(_.isNil(process.argv[2]) || _.isEmpty(process.argv[2])){
    console.error("Invalid File Name");
    return;
}
const csvFileName = path.join(__dirname, `/${process.argv[2]}`);
const jsonFileName = path.join(__dirname,
    (_.isNil(process.argv[3]) || _.isEmpty(process.argv[3])) ? 
    `${process.argv[2].split('.')[0]}.json` : process.argv[3]);

// get file
console.log(`Read ${csvFileName}`);
const csvFile = fs.readFileSync(csvFileName).toString().trim();
const lines = replaceAll(csvFile, '\n\r', '\r\n').split('\r\n');
const keys = lines.shift().split(',');
keys.map(key => key.trim());

// make object
const ret = [];
_.forEach(lines, line => {
    const vals = line.split(',');
    const obj = {}
    _.forEach(vals, (val, idx) => {
        obj[keys[idx]] = val.trim();
    })
    ret.push(obj);
})

// write json file
console.log(`Write on ${jsonFileName}`);
fs.writeFileSync(jsonFileName, JSON.stringify(ret));

// used function
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}
