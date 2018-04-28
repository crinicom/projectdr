/**
 * StakeholderController
 *
 * @description :: Server-side logic for managing stakeholders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function(req, res, err) {
        Project.findOne(req.param('belongs_to_project'), function foundProject(err, project) {
            if (err) return next(err);
            if (!project) return next();

            res.view({project:project, assoc_task:req.param('assoc_task')});  
        });
    },
    create:function(req, res, next) {
       var mails_array = req.param('mails');
       req.param.mails = mails_array.split(';');
        Stakeholder.create(req.params.all(), function stkCreated(err, stakeholder) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/stakeholder/new/');    
            }

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: req.param('belongs_to_project')+';',
                module: req.param('belongs_to') +';',
                item: req.param('section')+';',
                detail: 'Stakeholder creado: ' + req.param('name') + '; ' + req.param('comm_plan')+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

            res.redirect('/project/stakeholders/' + req.param('belongs_to_project') ); 
            
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
       /* Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
            if (err) return next(err);
            if (!project) return next();

            // res.json(project); solo check
            Stakeholder.find({belongs_to_project: project.id}).exec(function foundObjectives(err, objectives) {
                if (err) return next(err);
                
                res.view({objectives:objectives});
           });
        });*/
        Stakeholder.find(function foundStk(err, stakeholders) {
            if (err) return next(err);
            
            res.json(stakeholders);
            
        });
    },
     
    edit: function(req, res, next) {
        Stakeholder.findOne(req.param('id'), function foundStk(err, stakeholder) {
            if (err) return next(err);
            if (!stakeholder) return next();
            res.view({stakeholder:stakeholder,belongs_to_project:req.param('belongs_to_project'), assoc_task:req.param('assoc_task')});
        }); 
    },
    assign: function(req, res, next) {
        Stakeholder.findOne(req.param('id'), function foundStk(err, stakeholder) {
            if (err) return next(err);
            if (!stakeholder) return next();
            res.view({stakeholder:stakeholder,belongs_to_project:req.param('belongs_to_project'), assoc_task:req.param('assoc_task')});
        }); 
     
    },
    update_assign: function(req, res, next) {
        Stakeholder.update(req.param('id'), req.params.all(), function stakeholderkUpdated(err) {
            if (err) {
                return res.redirect('/stakeholder/edit/'+ req.param('id'));
            }
            res.redirect('/project/gantt/' + req.param('belongs_to_project') );
        }); 
    },
    update_status: function(req, res, next) {
        Stakeholder.update(req.param('id'), req.params.all(), function stakeholderkUpdated(err) {
            if (err) {
                
                return res.redirect('/project/gantt/' + req.param('belongs_to_project') );
            }
            res.status(200);
            res.redirect('/project/gantt/' + req.param('belongs_to_project') );
        }); 
    },
    update_status_ajax: function(req, res, next) {
       console.log("entrè a update_status_ajax");
        Stakeholder.update(req.param('id'), req.params.all(), function stakeholderkUpdated(err) {
            if (err) {
                
                return res.serverError(err);
            }
            return res.ok();
        }); 
    },

    update: function(req, res, next) {
           Stakeholder.update(req.param('id'), req.params.all(), function stakeholderkUpdated(err) {
            if (err) {
                return res.redirect('/stakeholder/edit/'+ req.param('id'));
            }
            
            res.redirect('/project/stakeholders/' + req.param('belongs_to_project') );
        }); 
    },
    destroy: function(req,res,next) {
    Stakeholder.destroy(req.param('id')).exec(function() {

        var now = new Date(Date.now()).toLocaleString().split(', ')[0];
        var log = {
            name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
            date: now,
            project: comes_from +';',
            module: 'n/a' +';',
            item: 'n/a'+';',
            detail: 'Stakeholder: ' + req.param('id') + '; eliminado' +';'
        };   
        Applog.create(log, function logCreated(err, applog) {
            if (err) { console.log(JSON.stringify(err)); }
            console.log(JSON.stringify(applog));
        });

        res.redirect('/project/stakeholders/' + req.param('belongs_to_project') );
    });    
    
    
    }
};

