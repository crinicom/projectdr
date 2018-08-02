/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {
	"new": function(req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        var resultado_ajax = "untouched";
        res.view({resultado_ajax:resultado_ajax});
        //req.session.flash = {};
    },
    create:function(req, res, next) {
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
          }
        
          sails.log.debug('req : ' + JSON.stringify(req.body['g-recaptcha-response']));
          console.log('req : ' + JSON.stringify(req.param('response')));
          var secret = '6LeUElIUAAAAAGpNoAN3QxRvysi96fT5KcCamQkr';
          //var responseText = JSON.stringify(req.body['g-recaptcha-response']);
          responseText = req.body['g-recaptcha-response'];
         // var responseText = req.param('response');
          request({
              uri: "https://www.google.com/recaptcha/api/siteverify",
              qs : {secret : secret, response : responseText},
              method: "POST"
          }, function(error, response, body) {
              if (error) {
                  sails.log.debug("error : " + error);
                  req.session.flash = {
                      err: err
                  }
              } else {
                  sails.log.debug(response.statusCode, body);
                  var apiResponse = JSON.parse(body);
                  var errorCodes = apiResponse['error-codes'];
                  if(!apiResponse.success && errorCodes !== null){
                      console.log("error captcha")
                      res.json(500,{error:'failure'});
                  } else {
                      console.log("success captcha");
                      //res.json(200,{data:'success'});
                      User.create(req.params.all(), function userCreated(err, user) {
                        //if (err) return next(err);
                        if (err) {
                            console.log(JSON.stringify(err)); 
                            req.session.flash = {
                                err: err
                            }
                            return res.redirect('/user/new/');    
                        }
                        // si logro crear el usuario, ya lo dejo autenticado para la sesión
                        req.session.authenticated = true;
                        req.session.User = user;
            
                        if(req.session.User.admin){
                            res.redirect('/user');
                            return;
                        }
                        user.online =true;
                        user.save(function (err) {
                            if (err) return next(err);
                        
                           // EmailService.sendWelcomeMail(user);
                            
                            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
                            var log = {
                                name: user.name,
                                date: now,
                                project: 'none',
                                module: 'new User',
                                item: 'signup',
                                detail: 'new User was created'
                            };   
                            Applog.create(log, function logCreated(err, applog) {
                                if (err) { console.log(JSON.stringify(err)); }
                                console.log(JSON.stringify(applog));
                            });

                           // EmailService.sendLogMail(log);  // <= Here we using
                            

                          res.redirect('/user/show/' + user.id ); 
                         // req.session.flash = {};
                        });
                    }); 
                  }
              }
          });



       
    },

    show: function(req, res, next) {
        
        User.findOne(req.param('id')).populateAll().exec(function(err,user) {
            if (err) return next(err);
            if (!user) return next();
           res.view({user:user});
           //res.json(user);
        });
    },
    index: function(req, res, next) {
/* solo para ep13
        console.log(new Date());
        console.log(req.session.authenticated);
*/
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            
            res.view({users:users});
        });
    },
    
   
    forgotpassword: function(req, res, next) {
      /*   var hash = "12345"
        User.findOne({email: req.param('email')}, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next(); 
            res.view({user:user, hash:hash});*/
            console.log("llegamos a forgotpassword");
            res.view();

    },

    forgotpasswordmail: function(req, res, next) {
        
        var seed = new Date(Date.now()).toLocaleString().split(', ')[0] + 500;
        var mail_hash = "xxx";
        
        
        //var hash = "12345";
        console.log(req.headers);
        console.log(mail_hash);
        var head = req.headers;
        console.log('host: ' + head.host);
        console.log("llegamos a forgotpasswordmail");
          User.findOne({email: req.param('email')}, function foundUser(err, user) {
            if (err) {
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/forgotpassword');    
            } 
            if (!user) {
                err = {"noUserFound":"No user found by that email"};
                console.log(JSON.stringify(err)); 
                
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/forgotpassword');    
            }   
           
            /* 
            if (err) return next(err);
              if (!user) return next(err); 
             */  
              require('bcrypt').hash(seed, 10, function passwordEncrypted(err, hash){
                if (err) return next(err);
                user.retrievepasswordhash = hash;
               console.log('user.retrievepasswordhash:',user.retrievepasswordhash);
              
               user.save(function(err){
                    if (err) {
                        console.log(err);
                    } else 
                    {
                    console.log(" saved hash: " + user.retrievepasswordhash );
                    console.log(user);
                // return next();                
                    }
                });

                var now = new Date(Date.now()).toLocaleString().split(', ')[0];
                var data = {
                    name: user.name,
                    email: user.email,
                    date: now,
                    hash: user.retrievepasswordhash,
                    host_base: head.host,
                };   


                console.log("llegamos a enviar el mail", data);
                
                //console.log(sails.config.mailgun.MAILGUN_SMTP_LOGIN,"-config->", sails.config.mailgun.MAILGUN_SMTP_PASSWORD);
                console.log(process.env.MAILGUN_SMTP_LOGIN ," process.env ->",process.env.MAILGUN_SMTP_PASSWORD);
                EmailService.sendPasswordRecoveryMail(data);

              });

 
              /* 
              Applog.create(data, function logCreated(err, data) {
                  if (err) { console.log(JSON.stringify(err)); }
                  console.log(JSON.stringify(data));
              });
 */
              
              res.view({user:user});
        });   
    },

    sendpending: function(req, res, next) {
        
        
          User.findOne({email: "cristian.menajovsky@gmail.com"}, function foundUser(err, user) {
            if (err) {
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/forgotpassword');    
            } 
            if (!user) {
                err = {"noUserFound":"No user found by that email"};
                console.log(JSON.stringify(err)); 
                
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/forgotpassword');    
            }   
           
           

                var now = new Date(Date.now()).toLocaleString().split(', ')[0];
                var data = {
                    name: user.name,
                    email: user.email,
                    date: now,
                    hash: user.retrievepasswordhash,
                    host_base: head.host,
                };   


                console.log("llegamos a enviar el mail", data);
                
                //console.log(sails.config.mailgun.MAILGUN_SMTP_LOGIN,"-config->", sails.config.mailgun.MAILGUN_SMTP_PASSWORD);
               // console.log(process.env.MAILGUN_SMTP_LOGIN ," process.env ->",process.env.MAILGUN_SMTP_PASSWORD);
                EmailService.sendPasswordRecoveryMail(data);

              });

 
              /* 
              Applog.create(data, function logCreated(err, data) {
                  if (err) { console.log(JSON.stringify(err)); }
                  console.log(JSON.stringify(data));
              });
 */
              
              //next();
         
    },

    pendingtasks: function(req, res, next) {
        
        User.find().populateAll().then(function foundUsers(users) {
            
           // return  res.json(users);
           //console.log('USUARIOS: ' ,users);
           return res.json(users);

        })
        .catch(function(err) {
            if (err) {
                console.log("error ---------------", err);
                return next(err);
            }
            
        });
 
  },

  todo: function(req, res, next) {
        
    User.findOne(req.param('id')).populateAll().exec(function(err,user) {
        
        if (err) return next(err);
        if (!user) return next();
        
        var projects = Project.find(function foundProjects(err, projects) {
            if (err) return next(err);
            
           return (projects);
        });
        console.log(projects);
        
        var tasks = {};
         tasks = user.pending_tasks;
        console.log(tasks);
        for (var i in tasks) {
            console.log("------------");
            console.log(projects[tasks[i].belongs_to_project].name);
        };
      
        return res.json(user.pending_tasks);

      

    });
   

},

    verifypass: function(req,res,next) {
        var mail_hash= req.param('hash');
        var query = req.query;
        console.log(mail_hash);
        console.log(req.query);
        
        User.findOne({retrievepasswordhash : query.q},function(err,user) {
            if (err) {
                console.log("error", err);
                return next(err);
            }
            if (!user) 
            {
                console.log("no user found by hash: ", query.q);
                return next();
            }
            console.log(user);
            req.session.authenticated = true;
            req.session.User = user;

            user.retrievepasswordhash = "";
            user.save(function(err){
                  if (err) {
                      console.log(err);
                  } else 
                  {
                      console.log(" saved hash: " + user.retrievepasswordhash );
                  console.log(user);
                 // return next();                
                  }
              });

            return res.redirect('/user/edit/'+ user.id);
            //res.json(user);
        });


    },
 
    edit: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            if (err) {
                req.session.flash = {
                    err: err
                }
                console.log(err);
            }
            res.view({user:user});
       }); 
    },
    update: function(req, res, next) {
        req.params.updatepass=true;
        console.log(req.params.updatepass);
           User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                console.log(err);
                return res.redirect('/user/edit/'+ req.param('id'));
            }
            return res.redirect('/user/show/'+ req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
        User.destroy(req.param('id')).exec(function() {
            res.redirect("/user/");
        }
        );
    },
    add_to_team: function(req, res, next) { //Recibe de la view: belongs_to_project que identifica al proyecto
        Project.findOne(req.param('belongs_to_project'), function foundProject(err, project) {
            
            if (err) {
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                return res.redirect('/project/show/'+req.param('belongs_to_project'));    
            }



            if (!project) return next();

        
            res.view({project:project});  
                
            });
            
    },
    rem_from_team: function(req, res, nest) {
        
    },
    update_team:function(req, res, next) {
     //Recibo email y projectsTeam (id de proyecto)  
        /* El modelo de Project espera una colección de USERS
        Sólo puedo inyecta el usuario si existe en la base como tal
        Si el usuario no existe, voy a la pàgina de creación de usuario
        y regreso para inyectar, ok?
        
        Qué tengo que lograr aquí?
        Encontrar el proyecto
        Encontrar el usuario basado en el mail
        (si el usuario no existe, ir a la página de creación y volver!)
        hacer un update del Project, inyectando el usuario encontrado
        
        Recibe de view:
        email
        new_project o sea el id del nuevo proyecto para agregar a la lista del usuario
        */

        User.findOne({email: req.param('email')}, function foundUser(err, user) {
            if (err) return next(err);
            
            if (!user) { res.redirect("/user/new");
        } else {

                user.participates.add(req.param('new_project'));
                console.log("Agrego a proyecto a lista de proyectos: " + user.participates);
            user.save(function(err){
                if (err) {
                    console.log(err);
                } else 
                {
                    console.log(" User advance saved");
                console.log(user);
                res.redirect("/project/show/"+req.param('new_project'));
                    
                }
                
            });
            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param('new_project'),
                module: 'Project Charter' ,
                item: 'Project Team',
                detail: req.param('email') + ' added to project'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });
        }
        });
    
    },

    

};

