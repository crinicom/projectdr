/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, err) {
        User.findOne(req.param('owner'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({user:user});  
        });
    },
    create: function(req, res, next) {
        var status_init= { "pcharter":"no", "edt":"no", "stakeholders": "no", "risks": "no", "gantt": "no", work: 0};
        var params = req.params.all();
        params['status'] = status_init;

        //Project.create(req.params.all(), function projectCreated(err, project) {
            Project.create(params, function projectCreated(err, project) {
            if (err) return next(err);
            
            //res.json(project);

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param('belongs_to_project')+';',
                module: 'nuevo proyecto' +';',
                item: 'nuevo proyecto' + ';',
                detail: 'Proyecto creado'+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });



         res.redirect('/user/show/'+project.owner);
        });
    },
    edit: function(req, res, next) {
        Project.findOne(req.param('id'), function foundProject(err, project) {
            if (err) return next(err);
            if (!project) return next();
            res.view({project:project});
        }); 
    },
    update: function(req, res, next) {
           Project.update(req.param('id'), req.params.all(), function projectUpdated(err) {
            if (err) {
                console.log(err);
                return res.redirect('/project/edit/'+ req.param('id'));
            }
            return res.redirect('/project/show/'+ req.param('id'));
            //return res.redirect('/project/edit/'+ req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
        Project.destroy(req.param('id')).exec(function() {


            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param("comes_from") +';',
                module: 'n/a' +';',
                item: 'n/a'+';',
                detail: 'Proyecto: ' + req.param('id') + '; eliminado' +';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

            res.redirect("/user/show/"+req.param('owner'));
        }
        );
    },

    index: function(req, res, next) {
        /* solo para ep13
                console.log(new Date());
                console.log(req.session.authenticated);
        */
        Project.find(function foundProjects(err, projects) {
            if (err) return next(err);
            
            User.find(function foundProjects(err, users) {
                if (err) return next(err);
            
                //res.json(users[1].name);
                res.view({projects:projects, users:users});
        
            });       
         });
       },

    show: function(req, res, next) {
        
        Project.findOne(req.param('id')).populateAll().exec(function(err,project) {
            if (err) return next(err);
            if (!project) return next();
           console.log("en show:", project.status);
 //sails.controllers.project.save_state1(project.id, "pcharter", "active",next);

            var comments = Comment.find({belongs_to_project: req.param('id'), belongs_to:"project"}, function foundComments(err, comments) {
                if (err) return next(err);
                var revcoms=comments.reverse();
                //console.log(comments);
                //return comments;
                //res.json(users[1].name);
                console.log("status desde show:", project.status);
                res.view({project:project, comments:revcoms});
        
            });
            
            //res.view({project:project, comments:comments});
           //res.json(project);
        });
    },
    // RESPONDO A LA LLAMADA PARA VER LA EDT
    edt: function(req, res, next) {
        // https://stackoverflow.com/questions/26535727/sails-js-waterline-populate-deep-nested-association
        var edt_in_progress ="";
        
        //if (req.param('edt_in_progress') == "finished") { edt_in_progres = "finished"}
        Project
        .findOne(req.param('id'))
        .populateAll()      
        .then(function (project){
            var objectives = Objective.find({
                "belongs_to_project": project.id
            })
            .populate('tasks')
            //.populate('lvl1tasks')
            .then(function (objectives){
                return objectives;
            });
            return [project, objectives];
        })
        .spread(function (project, objectives){
            project = project.toObject(); // <- HERE IS THE CHANGE!
            project.objectives = objectives; // It will work now
            //project.status = { "pcharter":"no", "edt":"no", "stk": "no", "risk_page": "no", "gantt_page": "no", "work": 0};
            //res.json(project);

            var comments = Comment.find({belongs_to_project: project.id, belongs_to:"edt"}, function foundComments(err, comments) {
                if (err) return next(err);
                var revcoms=comments.reverse();
                console.log(comments);
                //return comments;
                //res.json(users[1].name);
                res.view({objectives:objectives, project:project, edt_in_progress:edt_in_progress, comments:revcoms});
        
            });



            //res.view({objectives:objectives, project:project, edt_in_progress:edt_in_progress});
        }).catch(function (err){
            if (err) return res.serverError(err);
        });
         
    },
 // RESPONDO A LA LLAMADA PARA VER LA STAKEHOLDERS
    stakeholders: function(req, res, next) {
      
         Project
         .findOne(req.param('id'))
         .populateAll()      
         .then(function (project){
             var objectives = Objective.find({
                 "belongs_to_project": project.id
             })
             .populate('tasks')
             //.populate('lvl1tasks')
             .then(function (objectives){
                 return objectives;
             });
             var stakeholders = Stakeholder.find({
                 "belongs_to_project": project.id
             })
             //.populate('mails')
             .then(function (stakeholders){
                return stakeholders;
            });
             return [project, objectives, stakeholders];
         })
         .spread(function (project, objectives, stakeholders){
             project = project.toObject(); // <- HERE IS THE CHANGE!
             project.objectives = objectives; // It will work now
             project.stakeholders = stakeholders;
             //res.json(project);
             
             var comments = Comment.find({belongs_to_project: project.id, belongs_to:"stk"}, function foundComments(err, comments) {
                if (err) return next(err);
                var revcoms=comments.reverse();
                console.log(comments);
                //return comments;
                //res.json(users[1].name);
                res.view({objectives:objectives, project:project, stakeholders:stakeholders,comments:revcoms});
        
            });
             
             
             
            
            }).catch(function (err){
             if (err) return res.serverError(err);
         });
          
     },

     // RESPONDO A LA LLAMADA PARA VER RIESGOS
    risks: function(req, res, next) {
     
          Project
          .findOne(req.param('id'))
          .populateAll()      
          .then(function (project){
              var stakeholders = Stakeholder.find({
                  "belongs_to_project": project.id
              })
              //.populate('tasks')
              //.populate('lvl1tasks')
              .then(function (stakeholders){
                  return stakeholders;
              });
              var risks = Risk.find({
                "belongs_to_project": project.id
            })
            //.populate('tasks')
            //.populate('lvl1tasks')
            .then(function (risks){
                return risks;
            });
              return [project, stakeholders, risks];
          })
          .spread(function (project, stakeholders, risks){
              project = project.toObject(); // <- HERE IS THE CHANGE!
              project.stakeholders = stakeholders;
              project.risks = risks; // It will work now
              //res.json(project);
              
              var comments = Comment.find({belongs_to_project: req.param('id'), belongs_to:"risks"}, function foundComments(err, comments) {
                if (err) return next(err);
                var revcoms=comments.reverse();
                console.log(comments);
                //return comments;
                //res.json(users[1].name);
                res.view({risks:risks, project:project, stakeholders:stakeholders, comments:revcoms});
        
            });
              
              
             
             }).catch(function (err){
              if (err) return res.serverError(err);
          });
           
      },

       // RESPONDO A LA LLAMADA PARA VER GANTT----
       gantt: function(req, res, next) {
        // https://stackoverflow.com/questions/26535727/sails-js-waterline-populate-deep-nested-association

        Project
        .findOne(req.param('id'))
        .populateAll()      
        .then(function (project){
            var objectives = Objective.find({
                "belongs_to_project": project.id
            })
            .populate('tasks')
            .then(function (objectives){
                return objectives;
            });
            var stakeholders = Stakeholder.find({
                "belongs_to_project": project.id
            })
            .then(function (stakeholders){
                return stakeholders;
            });
            var comments = Comment.find({ "belongs_to_project": project.id, belongs_to:'gantt'})
            .then (function(comm) { return comm;});
            //var comments = comm.reverse();  
            
            var risks = Risk.find({
              "belongs_to_project": project.id
          });
           //var team = User.find(project.team).then(function(team) {return team;});
          
          return [project, objectives, stakeholders, risks,comments];
        })
        .spread(function (project, objectives, stakeholders, risks,comments){
            project = project.toObject(); // <- HERE IS THE CHANGE!
            project.objectives = objectives; // It will work now
            project.stakeholders = stakeholders;
            project.risks = risks;
            var comments = comments.reverse();
            //res.json(project);

// Calculo avance cada vez que muestro, y guardo en un campo de Project
            
            var tasks =[];
            _.each(project.objectives, function(objective) {
                _.each(objective.tasks, function(task) {
                    tasks.push(task);
                });
            });
            var comms = [];
            _.each(stakeholders, function(stk) {
                if(stk.comm_plan) {comms.push(stk.comm_plan) }
            });
            console.log(comms);

            var mitigations = [];
            _.each(risks, function(risk) {
                if(risk.mitigation) {mitigations.push(risk.mitigation) }
            });
            console.log(mitigations);

            var task_advance = 
                (
                    tasks.filter(function Advance(task) { return (task.status == "En proceso" )}).length * 50  +
                    tasks.filter(function Advance(task) { return (task.status == "Finalizada" )}).length * 100)
                    / tasks.length*100;
            console.log("task advance: " + task_advance);

            var stk_advance = 
                (
                    stakeholders.filter(function Advance(stk) { return (stk.status == "En proceso" )}).length * 50  +
                    stakeholders.filter(function Advance(stk) { return (stk.status == "Finalizada" )}).length * 100)
                    / comms.length*100;
            console.log("comms advance: " + stk_advance);
//  
            var risk_advance = 
                (
                    risks.filter(function Advance(risk) { return (risk.status == "En proceso" )}).length * 50  +
                    risks.filter(function Advance(risk) { return (risk.status == "Finalizada" )}).length * 100)
                    / mitigations.length*100;
            console.log("mitigations advance: " + risk_advance);

            var advance = ((
                tasks.filter(function Advance(task) { return (task.status == "En proceso" )}).length * 50  +
                tasks.filter(function Advance(task) { return (task.status == "Finalizada" )}).length * 100 +
                stakeholders.filter(function Advance(stk) { return (stk.status == "En proceso" )}).length * 50  +
                stakeholders.filter(function Advance(stk) { return (stk.status == "Finalizada" )}).length * 100 +
                risks.filter(function Advance(risk) { return (risk.status == "En proceso" )}).length * 50  +
                risks.filter(function Advance(risk) { return (risk.status == "Finalizada" )}).length * 100

            ) / (tasks.length*100 + comms.length*100 + mitigations.length*100))*100;
            console.log("General advance: " + parseInt(advance,10) + typeof parseInt(advance,10));
        //FIN calculo de avance

        advance = parseInt(advance,10);

        //project.status = status;
        Project.findOne(project.id, function foundProject(err, proj) {
                if (err) return next(err);
                if (!proj) return next();
                proj.advance = 0;
                proj.advance = advance;
                console.log("General advance: " + proj.advance + " type: " + typeof proj.advance);
            proj.save(function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log(" Project advance saved: " + proj.advance );
                   
                    res.view({objectives:objectives, project:project, stakeholders:stakeholders, risks:risks, comments:comments, advance:advance});
                   
                    
                }
            });
        }); 
        
        }).catch(function (err){
            if (err) return res.serverError(err);
        });
         
    },

   
 save_state: function (req, res, next) {
    Project.findOne(req.param('id'), function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        
        project.status[req.param('key')] = req.param('state');

        project.save(function(err){
            if (err) {
                return res.json({err});
            } else {
                console.log( '\n', req.param('key'),'\n');
                console.log( '\n',req.param('state'),'\n');
                console.log( '\n', project.status,'\n');
            }
        });
          
            if (project.status[req.param('state')] == "wip" && project.status[req.param('key')] != "pcharter") {  

                return res.redirect('/project/'+ req.param('key')+"/"+ req.param('id'));
            }  else return res.redirect('/project/show/'+ req.param('id'));
        //res.json({status});

    }); 
}
};

