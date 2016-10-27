var nodemailer = require('nodemailer');
var templateBinder = require('../helpers/templateBinder');
var path = require('path');
var mailTemplatesPath = path.join(__dirname, '../mailTemplates/');

var mailer = {
    finishSend: function (mailOptions, next) {
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'irvine-devs-2@hotmail.com',
                pass: '1rv!n3P@$$'
            }
        });

        transporter.sendMail(mailOptions, next, function (error, info) {
            if (error) {
                console.log(error);
                if (next) {
                    next(error, null);
                }
            } else {
                console.log('Message sent: ' + info.response);
                if (next) {
                    next(null, info);
                }
            }
        });
    },
    sendEmail: function (templateName, dataToBind, subject, recipients, next) {
        templateBinder.fill(mailTemplatesPath + templateName + '.html', dataToBind, function (result) {
            var mailOptions = {
                from: 'irvine-devs-2@hotmail.com',
                to: recipients, // list of receivers
                subject: subject, // Subject line
                html: result // You can choose to send an HTML body instead
            };
            mailer.finishSend(mailOptions, function () {
                next();
            });
        });
    }
}

module.exports = mailer;