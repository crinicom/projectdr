/**
 * ObjectiveController
 *
 * @description :: Server-side logic for managing objectives
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, err) {
        Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
            if (err) return next(err);
            if (!project) return next();

            res.view({project:project});  
        });
    },
    create:function(req, res, next) {
        Objective.create(req.params.all(), function objectiveCreated(err, objective) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                return res.redirect('/project/show/'+ req.param('belongs_to_project'));
              //  return res.redirect('/objective/new/');    
            }

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param('belongs_to_project')+';',
                module: req.param('belongs_to') +';',
                item: req.param('section')+';',
                detail: 'Objetivo creado: ' + req.param('item') + '; ' + req.param('text')+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });
            
            //save state of the project
            //var state_saved =  sails.helpers.save_state(belongs_to_project, "pcharter", "finished");

            var SetStatePcharter_FINISHED= StateService.SetState({id:  req.param('belongs_to_project'), key: "pcharter", state: "finished"})
            console.log(SetStatePcharter_FINISHED);
            var SetStateEDT_WIP= StateService.SetState({id:  req.param('belongs_to_project'), key: "edt", state: "wip"})
            console.log(SetStateEDT_WIP);

            res.redirect('/project/show/' + objective.belongs_to_project ); 
            //res.json(objective);
           // req.session.flash = {};
        });
    },

    show: function(req, res, next) {
        
        Objective.findOne(req.param('id')).populateAll().exec(function(err,objective) {
            if (err) return next(err);
            if (!objective) return next();
           res.view({objective:objective});
           //res.json(user);
        });
    },
    index: function(req, res, next) {
     
        Project
        .findOne(req.param('belongs_to_project'))
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
            //res.json(project);
            res.view({objectives:objectives});
        }).catch(function (err){
            if (err) return res.serverError(err);
        });
        },

  //  },
    
   
    edit: function(req, res, next) {
        Objective.findOne(req.param('id'), function foundObjective(err, objective) {
            if (err) return next(err);
            if (!objective) return next();
            res.view({objective:objective});
        }); 
    },
    update: function(req, res, next) {
           Objective.update(req.param('id'), req.params.all(), function objectiveUpdated(err) {
            if (err) {
                return res.redirect('/objective/edit/'+ req.param('id'));
            }

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.param('user_name') + '; id: ' + req.param('user')+';',
                date: now,
                project: req.param('belongs_to_project')+';',
                module: req.param('belongs_to') +';',
                item: req.param('section')+';',
                detail: 'Objetivo modificado: ' + req.param('item') + '; ' + req.param('text')+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

            res.redirect('/project/show/' + req.param('belongs_to_project') ); 
        }); 
    },
    destroy: function(req,res,next) {
       var project =  Project
        .findOne(req.param('belongs_to_project'))
        .populateAll()      
        .then(function (project){
            // if (err) return next(err);
            // if (!project) return next();
        
           
           // return project;
           Objective.destroy(req.param('id')).then(function() {
            //res.redirect("/objective/");
            //res.redirect('/project/show/' + objective.belongs_to_project );
            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: project.id +';',
                module: 'n/a' +';',
                item: 'n/a'+';',
                detail: 'Objetivo eliminado: ' + req.param('id') + '; eliminado' +';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });
           
         });
       
        console.log("\ncuantos obj quedan? FUERA THEN", project.objectives.length,'\n');
        console.log("queda: ", project.objectives);
        if(project.objectives.length == 1) {
           console.log("en el if:", project.objectives.length);
            var SetStatePcharter_WIP= StateService.SetState({id:  project.id, key: "pcharter", state: "wip"});
            console.log(SetStatePcharter_WIP);
            var SetStateEDT_NO= StateService.SetState({id:  project.id, key: "edt", state: "no"});
            console.log(SetStateEDT_NO);
        }
        res.redirect('/project/show/' + project.id );  
        }); 
        }
           
            
      
       
        // Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
        //     if (err) return next(err);
        //     if (!project) return next();

    //     Objective.destroy(req.param('id')).exec(function() {
    //         //res.redirect("/objective/");
    //         //res.redirect('/project/show/' + objective.belongs_to_project );
    //         var now = new Date(Date.now()).toLocaleString().split(', ')[0];
    //         var log = {
    //             name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
    //             date: now,
    //             project: project.id +';',
    //             module: 'n/a' +';',
    //             item: 'n/a'+';',
    //             detail: 'Objetivo eliminado: ' + req.param('id') + '; eliminado' +';'
    //         };   
    //         Applog.create(log, function logCreated(err, applog) {
    //             if (err) { console.log(JSON.stringify(err)); }
    //             console.log(JSON.stringify(applog));
    //         });
    //     }
    // );
    //    console.log("cuantos obj quedan? ", project.objectives.length);
    //      res.redirect('/project/show/' + project.id );
    // });    
    
    
};
