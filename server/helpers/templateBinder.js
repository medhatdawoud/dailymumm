var handlebars = require('handlebars');
var fs = require('fs');

module.exports = {
    fill: function (templatePath, data, next) {
        fs.readFile(templatePath, 'utf8', function (err, fileContent) {
            if (err) throw err;

            var sourceText = fileContent;
            var template = handlebars.compile(sourceText);
            var result = template(data);
            next(result);
        });
    }
};