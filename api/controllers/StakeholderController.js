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
        Stakeholder.create(req.params.all(), function stkCreated(err, stakeholder) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/stakeholder/new/');    
            }
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
        res.redirect('/project/edt/' + req.param('belongs_to_project') );
    });    
    
    
    }
};

