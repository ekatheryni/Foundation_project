var fs = require('fs');
var ejs = require('ejs');


exports.client_submit = ejs.compile(fs.readFileSync('template/client-submit-okno.ejs', "utf8"));