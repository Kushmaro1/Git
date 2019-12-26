const path = require('path');

const fs = require('fs');
// const dada = require.resolve('./package.json');
// const appVersion = new Date().toDateString();
const appVersion = 'v0.';

// console.log('\nRunning pre-build tasks');

const versionFilePath = path.join(__dirname + '/src/app/shared/version.ts');


// console.log(`Dada ${dada}`);

// ensure version module pulls value from package.json
fs.readFile(versionFilePath,{encoding:'utf8'}, function (err,data) {
    if (err) {
        return // console.log(err);
    }
    let json = JSON.stringify(data);
    let arr=json.split(" = 'v0.");
    let arr2=arr[1].split("'")
    let ver=(arr2[0]*1 + 0.01).toFixed(2);
    const src = `export const version = '${appVersion+ver}';`;
    fs.writeFile(versionFilePath, src, { flat: 'w' }, function (err) {
            if (err) {
                return // console.log(err);
            }

            console.log('Updating application version',appVersion+ver);
    });
    // console.log(ver);
    // console.log(json);
});

