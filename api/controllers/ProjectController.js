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
        Project.create(req.params.all(), function projectCreated(err, project) {
            if (err) return next(err);
            
            //res.json(project);
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
                return res.redirect('/project/edit/'+ req.param('id'));
            }
            //return res.redirect('/user/show/'+ req.param('id'));
            return res.redirect('/project/edit/'+ req.param('id'));
        }); 
    },
    show: function(req, res, next) {
        
        Project.findOne(req.param('id')).populateAll().exec(function(err,project) {
            if (err) return next(err);
            if (!project) return next();
           
            res.view({project:project});
           //res.json(project);
       
        
        });
    },
    // RESPONDO A LA LLAMADA PARA VER LA EDT
    edt: function(req, res, next) {
        // https://stackoverflow.com/questions/26535727/sails-js-waterline-populate-deep-nested-association
        var edt_in_progress ="";
        
        if (req.param('edt_in_progress') == "finished") { edt_in_progres = "finished"}
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
            project = project.toObject() // <- HERE IS THE CHANGE!
            project.objectives = objectives; // It will work now
            project.status = { "pcharter":"no", "edt":"no", "stk": "no", "risk": "no", "gantt": "no", "work": 0};
            //res.json(project);
            res.view({objectives:objectives, project:project, edt_in_progress:edt_in_progress});
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
             project = project.toObject() // <- HERE IS THE CHANGE!
             project.objectives = objectives; // It will work now
             project.stakeholders = stakeholders;
             //res.json(project);
             res.view({objectives:objectives, project:project, stakeholders:stakeholders});
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
              project = project.toObject() // <- HERE IS THE CHANGE!
              project.stakeholders = stakeholders;
              project.risks = risks; // It will work now
              //res.json(project);
              res.view({risks:risks, project:project, stakeholders:stakeholders});
             }).catch(function (err){
              if (err) return res.serverError(err);
          });
           
      },

       // RESPONDO A LA LLAMADA PARA VER RIESGOS
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
            var risks = Risk.find({
              "belongs_to_project": project.id
          })
            return [project, objectives, stakeholders, risks];
        })
        .spread(function (project, objectives, stakeholders, risks){
            project = project.toObject() // <- HERE IS THE CHANGE!
            project.objectives = objectives; // It will work now
            project.stakeholders = stakeholders;
            project.risks = risks;
            //res.json(project);
            res.view({objectives:objectives, project:project, stakeholders:stakeholders, risks:risks});
        }).catch(function (err){
            if (err) return res.serverError(err);
        });
         
    },

    save_state: function(req, res, next) {
      /*   var pro = Project.findOne(req.param('id'), function foundProject(err, project) {
            if (err) return next(err);
            if (!project) return next();
            return project;
        }); */
        var status = {};
        status[req.param('key')] = req.param('state');
        
        Project.update(req.param('id'), status, function stateUpdated(err, upd) {
         if (err) {
             //return res.redirect('/project/edit/'+ req.param('id'));
            return res.json("error");
            }
         //return res.redirect('/user/show/'+ req.param('id'));
         res.json(upd);
     });  

    
 }

    
};

