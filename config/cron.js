var request = require('request');
var yourSails = require('sails').constructor;
module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        console.log('You will see this every second');
        
 
        request('http://localhost:1337/user/todo/22', { json: true }, (err, res, body) => {
         // if (err) { return console.log(err); }
          //console.log(body);
          //users = JSON.parse(body);
        /*  FUNCIONA!
          var users = body;
          var found = users.find(function(user) {
            return user.id === 22;
          }); */
          var found = body;
         
         //->>>>>>>>>>>>>>>>>< console.log(found);
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

