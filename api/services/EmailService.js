// EmailService.js
module.exports.sendWelcomeMail = function(obj) {
    sails.hooks.email.send(
    'welcomeEmail', 
    {
        name: obj.name
    },
    {
        to: obj.email,
         subject: "Welcome Email"
    },
    function(err) {console.log(err || "Mail Sent!");}
    )
   },
   
   module.exports.sendLogMail = function(obj) {
    sails.hooks.email.send(
    'LogEmail', 
    {
        name: obj.name,
        date: obj.date,
        module: obj.module,
        item: obj.item,
        detail: obj.detail

    },
    {
        to: 'cristian.menajovsky@gmail.com',
         subject: "Log"
    },
    function(err) {console.log(err || "Mail Sent!");}
    )
   };