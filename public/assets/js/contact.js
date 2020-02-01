const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport(mailGun());

const auth = {
    auth: {
        api_key: '81fadf6a029207bb6526b9c443e4fdb2-074fa10c-dc354498',
        domain: 'sandbox6a458234bbe34ecfa1d36814305d03af.mailgun.org'
    }
};

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'group2.passport@gmail.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

var contactjs = ('/assets/js/contact.js');

router.post('/email', function ( req, res) {
    const { subject, email, text} = req.body;
    console.log('Data: ', req.body);
  
    sendMail(email, subject, text, function(err, data) {
      if (err) {
        res.status(500).json({ message: 'Internal Error' });
      } else {
        res.json({ message: 'Email Sent' });
      }
    });
  });
    $('form').on('submit'), (e) => {
        e.preventDefault();

        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const text = $('#text').val().trim();

        const data = {
            email,
            subject,
            text
        };

        $.post('/email', data, function () {
            console.log('Server received data');
        });
    };

    // const auth = {
    //     auth: {
    //         api_key: '81fadf6a029207bb6526b9c443e4fdb2-074fa10c-dc354498',
    //         domain: 'sandbox6a458234bbe34ecfa1d36814305d03af.mailgun.org'
    //     }
    // };

    // const transporter = nodemailer.createTransport(mailGun());

    // const sendMail = (email, subject, text, cb) => {
    //     const mailOptions = {
    //         from: email,
    //         to: 'group2.passport@gmail.com',
    //         subject,
    //         text
    //     };

    //     transporter.sendMail(mailOptions, function (err, data) {
    //         if (err) {
    //             cb(err, null);
    //         } else {
    //             cb(null, data);
    //         }
    //     });
    // };


// module.exports = sendMail;