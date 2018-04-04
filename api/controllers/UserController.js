/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	"new": function(req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
    },
    create:function(req, res, next) {
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
            
                EmailService.sendWelcomeMail(user);  // <= Here we using
              /*   res.json(200, {user: user}); */
            res.redirect('/user/show/' + user.id ); 
           // req.session.flash = {};
        });
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
    
   
    edit: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({user:user});
        }); 
    },
    update: function(req, res, next) {
           User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
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
        }
        });
    
    },

};

