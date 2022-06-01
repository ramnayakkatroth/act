const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
async function sendMail(emailDetails) {        
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lakshmanavula32@gmail.com',
            pass: 'ivdczufxypayaqnq'
        }
    });
    const data = await ejs.renderFile(__dirname + "/email-template.ejs", emailDetails);        
    let mailDetails = {
        from: 'lakshmanavula32@gmail.com',
        to: emailDetails.email,
        subject: emailDetails.subject,
        html: data
    };    

    mailTransporter.sendMail(mailDetails, function(err, info) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

// async function SendHtmlMail(data, email, subject) {
//     const transporter = nodemailer.createTransport({
//         host: "email-smtp.ap-south-1.amazonaws.com",
//         auth: {
//             user: 'AKIAZ3AXMMACAWDEA2W3',
//             pass: 'BG+YpfT3rvs0u3ZjIoGnae/x+GaXfEbA1TG03FmESPVR'
//         },
//         secure: true,//true
//         port: 465,//465
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     //const data = await ejs.renderFile(__dirname + "/email-template.ejs", emailDetails);

//     const mainOptions = {
//         from: '"Time sheet app" <no-reply@duvim.com>',
//         to: email,
//         subject: subject,
//         html: data
//     };
//     //console.log(emailDetails, "emailDetailssss");
//     transporter.sendMail(mainOptions, (err, info) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Message sent: ' + info.response);
//         }
//     });
// }
module.exports = { sendMail }