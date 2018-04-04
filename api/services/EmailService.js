// EmailService.js
module.exports.sendWelcomeMail = function(obj) {
    sails.hooks.email.send(
    'welcomeEmail', 
    {
    Name: obj.name
    },
    {
    to: obj.email,
    subject: "Welcome Email"
    },
    function(err) {console.log(err || "Mail Sent!");}
    )
   };