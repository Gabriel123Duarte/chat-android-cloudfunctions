const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    'smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com');


exports.welcomeFunction = 
		functions.database.ref('/user/{pushId}/email').onWrite(event =>{

			// Looking just for a new register
			if(!event.data.val() || event.data.previous.val()){
				return;
			}

			const email = event.data.val();
			const mailOptions = {
				    from: '"Chat App." <duagabriel@gmail.com>',
				    to: email
				};
			mailOptions.subject = 'Thanks and Welcome!';
    		mailOptions.text = 'Thanks you for register in my chat app.';
    		return mailTransport.sendMail(mailOptions);
		});


