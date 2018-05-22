//require('dotenv').config()
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
   
   module.exports.sendPasswordRecoveryMail = function(obj) {
    sails.hooks.email.send(
    'PasswordRecoveryMail', 
    {
        name: obj.name,
        email: obj.email,
        date:obj.date,
        hash: obj.hash,
        host_base:obj.host_base,
        

    },
    {
        to: obj.email,
         subject: "Project Doctor - Password Recovery"
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