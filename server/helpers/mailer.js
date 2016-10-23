module.exports = function () {
    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '', // Your email id
            pass: '' // Your password
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Test User" <test@gmail.com>', // sender address
        to: 'medhatdawoud@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plaintext body
        html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}