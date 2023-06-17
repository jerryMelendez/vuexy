// import {createTestAccount} from "nodemailer";
// import { createTransport } from "nodemailer";
// import { getTestMessageUrl } from "nodemailer";

// // async function sendEmail(){
//     console.log('sendEmail');
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = createTransport({
//         host: 'mail.ohlalashesbyross.cloud',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//         user: 'sistema@ohlalashesbyross.cloud', // generated ethereal user
//         pass: 'Nj62RFo2GjC1', // generated ethereal password
//         }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "mjerrymoises@gmail.com, jerrymelendez0@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// // }