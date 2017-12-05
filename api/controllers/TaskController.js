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
            return res.redirect('/objective/show/'+ req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
       Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
            if (err) return next(err);
            if (!project) return next();

        Objective.destroy(req.param('id')).exec(function() {
            //res.redirect("/objective/");
            //res.redirect('/project/show/' + objective.belongs_to_project );
            
        }
    );
         res.redirect('/project/show/' + project.id );
    });    
    
    }
};

