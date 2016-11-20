var nodemailer = require('nodemailer');
var templateBinder = require('../helpers/templateBinder');
var path = require('path');
var mailTemplatesPath = path.join(__dirname, '../mailTemplates/');
var transporter;

initMailer();

var mailer = {
    finishSend: function (mailOptions, next) {
        transporter.sendMail(mailOptions, next, function (error, info) {
            console.log("transporter.sendMail: ", arguments);
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
            mailer.finishSend(mailOptions, next);
        });
    }
}



function initMailer() {
    transporter = nodemailer.createTransport({
        "aliases": ["Outlook", "Outlook.com", "Hotmail.com"],
        "domains": ["hotmail.com", "outlook.com"],
        "host": "smtp.live.com",
        "port": 25,
         secure: false, // use SSL
        auth: {
            user: 'irvine-devs-2@hotmail.com',
            pass: '1rv!n3P@$$'
        }
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });
}

module.exports = mailer;