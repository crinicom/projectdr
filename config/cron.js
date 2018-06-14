var request = require('request');
var yourSails = require('sails').constructor;
module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        console.log('You will see this every second');
        
 
        request('http://localhost:1337/user/pendingtasks', { json: true }, (err, res, body) => {
         // if (err) { return console.log(err); }
          //console.log(body);
          //users = JSON.parse(body);
          var users = body;
          console.log(users[0]);
       /*  for (user in users) {
          console.log(user.id);
        } */
          
        });
       
    
  }
}
}


  // https://github.com/ghaiklor/sails-hook-cron
  // https://stackoverflow.com/questions/24123090/using-waterline-model-outside-sailsjs-api
  //https://stackoverflow.com/questions/35459231/accessing-a-sails-controller-from-a-spawned-process

