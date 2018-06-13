var request = require('request');
var yourSails = require('sails').constructor;
module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        console.log('You will see this every second');
        var mySails = new yourSails();
        mySails.lift({  port: 1339},
          function(err) {
            if (err) {
              console.error('Failed to lift app.  Details:', err);
              return;
            }
          
            // --•
            // Make a request using the "request" library and display the response.
            // Note that you still must have an `api/controllers/FooController.js` file
            // under the current working directory, with an `index` action,
            // or a `/foo` or `POST /foo` route set up in `config/routes.js`.

            mySails.request({url:'/user/sendpending', method: 'post'}, function (err, response) {
                if (err) {
                  console.log('Could not send virtual request.  Details:', err);
                }
                else {
                  console.log('Got response:', response);
                }
            });

         /*  mySails.controllers.user.sendpending(null, function (data) {
              console.log("entré en el sendpending");
          }); */
          mySails.lower(function (err) {
            if (err) {
              console.log('Could not lower Sails app.  Details:',err);
              return;
            }
      
            // --•
            console.log('Successfully lowered Sails app.');
      
          });//</lower sails app>
        });
    
  }
}
}


  // https://github.com/ghaiklor/sails-hook-cron
  // https://stackoverflow.com/questions/24123090/using-waterline-model-outside-sailsjs-api
  //https://stackoverflow.com/questions/35459231/accessing-a-sails-controller-from-a-spawned-process

