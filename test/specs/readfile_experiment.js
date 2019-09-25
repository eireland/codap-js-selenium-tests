const fs = require('fs-extra')

const links_file = "fixtures/CODAPDocLinks.txt";
var data =fs.readFileSync(links_file, 'utf-8');
var dataByLine = data.split("\n")
console.log(dataByLine);
// console.log(listingArray)