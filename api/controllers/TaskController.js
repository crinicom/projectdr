/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, err) {
        Objective.findOne(req.param('belongs_to_obj'), function foundObjective(err, objective) {
            if (err) return next(err);
            if (!objective) return next();

            res.view({objective:objective});  
        });
    },
    create:function(req, res, next) {
        Task.create(req.params.all(), function taskCreated(err, task) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/task/new/');    
            }

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param('belongs_to_project')+';',
                module: req.param('belongs_to') +';',
                item: req.param('section')+';',
                detail: 'TASK creada: ' + req.param('text') + '; para el obj: ' + req.param('belongs_to_obj')+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

            res.redirect('/project/edt/' + req.param('belongs_to_project') ); 
            
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
        Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
            if (err) return next(err);
            if (!project) return next();

            // res.json(project); solo check
            Objective.find({belongs_to_project: project.id}).exec(function foundObjectives(err, objectives) {
                if (err) return next(err);
                
                res.view({objectives:objectives});
           });
        });
    },
    
   
    edit: function(req, res, next) {
        Task.findOne(req.param('id'), function foundTask(err, task) {
            if (err) return next(err);
            if (!task) return next();
            res.view({task:task, belongs_to_project:req.param('belongs_to_project')});
        }); 
    },
    assign: function(req, res, next) {
        Task.findOne(req.param('id'), function foundTask(err, task) {
            if (err) return next(err);
            if (!task) return next();
            res.view({task:task, belongs_to_project:req.param('belongs_to_project')});
        }); 
     
    },
    update_assign: function(req, res, next) {
        console.log("+++++++++++updating task: ", req.param('id'));
        Task.update(req.param('id'), req.params.all(), function taskUpdated(err) {
         if (err) {
             return res.redirect('/task/edit/'+ req.param('id'));
         }
         console.log(JSON.stringify(req.params.all()));
         res.redirect('/project/gantt/' + req.param('belongs_to_project') );
     }); 
 },
 update_status: function(req, res, next) {
    Task.update(req.param('id'), req.params.all(), function taskUpdated(err) {
     if (err) {
         return res.redirect('/project/gantt/' + req.param('belongs_to_project') );
     }
     res.redirect('/project/gantt/' + req.param('belongs_to_project') );
 }); 
},
    update: function(req, res, next) {
           Task.update(req.param('id'), req.params.all(), function taskUpdated(err) {
            if (err) {
                return res.redirect('/task/edit/'+ req.param('id'));
            }
            res.redirect('/project/edt/' + req.param('belongs_to_project') );
        }); 
    },
    
    destroy: function(req,res,next) {
    Task.destroy(req.param('id')).exec(function() {

        var now = new Date(Date.now()).toLocaleString().split(', ')[0];
        var log = {
            name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
            date: now,
            project: req.param('belongs_to_project')+';',
            module: 'n/a' +';',
            item: 'n/a'+';',
            detail: 'Task: ' + req.param('id') + '; eliminado' +';'
        };   
        Applog.create(log, function logCreated(err, applog) {
            if (err) { console.log(JSON.stringify(err)); }
            console.log(JSON.stringify(applog));
        });

        res.redirect('/project/edt/' + req.param('belongs_to_project') );
    });    
    
    
    }
};

