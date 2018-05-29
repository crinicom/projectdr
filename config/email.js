//require('dotenv').config()
module.exports.email = {
   service: 'Mailgun',
   //transporter: {
   /*   host: 'smtp.mailgun.org',
    port: 2525,
     secure: true,
    */ auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD
        //api_key: "key-9ceb1387dc5130a7a830dd757f003f88",
        //domain: "sandbox239a897a5c494d2ca34c4a33944bfa15.mailgun.org",
      },
    /* }, */
    templateDir: 'views/emailTemplates',
    from: 'cristian.menajovsky@gmail.com',
    testMode: false,
    ssl: true
   };

 