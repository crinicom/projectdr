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
                
                return res.redirect('/objective/new/');    
            }
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
       /* original mio
        Project.findOne(req.param('belongs_to_project'), function foundObjective(err, project) {
            if (err) return next(err);
            if (!project) return next();

            // res.json(project); solo check
            Objective.find({belongs_to_project: project.id}).exec(function foundObjectives(err, objectives) {
                if (err) return next(err);
                
                res.view({objectives:objectives});
           });
        }); 
        */
// https://stackoverflow.com/questions/26535727/sails-js-waterline-populate-deep-nested-association

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

