module.exports.email = {
    service: 'Mailgun',
    auth: {
      user: "postmaster@sandbox239a897a5c494d2ca34c4a33944bfa15.mailgun.org",
      pass: "f4188e12667eb874599cda9ff080716c-bdd08c82-17ecd52a"
        //api_key: "key-9ceb1387dc5130a7a830dd757f003f88",
        //domain: "sandbox239a897a5c494d2ca34c4a33944bfa15.mailgun.org",
      },
    templateDir: 'views/emailTemplates',
    from: 'info@mycompany.com',
    testMode: false,
    ssl: true
   };

 