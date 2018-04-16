/**
 * MilestoneController
 *
 * @description :: Server-side logic for managing milestones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, err) {
        Project.findOne(req.param('belongs_to_project'), function foundMilestone(err, project) {
            if (err) return next(err);
            if (!project) return next();

            res.view({project:project});  
        });
    },
    create:function(req, res, next) {
        Milestone.create(req.params.all(), function milestoneCreated(err, milestone) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/milestone/new/');    
            }

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now+';',
                project: req.param('belongs_to_project')+';',
                module: req.param('belongs_to') +';',
                item: req.param('section')+';',
                detail: 'Comentario: ' + req.param('item') + '; ' + req.param('text')+';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

            res.redirect('/project/show/' + milestone.belongs_to_project ); 
            //res.json(milestone);
           // req.session.flash = {};
        });
    },

    show: function(req, res, next) {
        
        Milestone.findOne(req.param('id')).populateAll().exec(function(err,milestone) {
            if (err) return next(err);
            if (!milestone) return next();
           res.view({milestone:milestone});
           //res.json(user);
        });
    },
    index: function(req, res, next) {
        Milestone.find(function foundMilestones(err, milestones) {
            if (err) return next(err);
            
            res.view({milestones:milestones});
        });
    },
    
   
    edit: function(req, res, next) {
        Milestone.findOne(req.param('id'), function foundMilestone(err, milestone) {
            if (err) return next(err);
            if (!milestone) return next();
            res.view({milestone:milestone});
        }); 
    },
    update: function(req, res, next) {
           Milestone.update(req.param('id'), req.params.all(), function milestoneUpdated(err) {
            if (err) {
                return res.redirect('/milestone/edit/'+ req.param('id'));
            }
            return res.redirect('/milestone/show/'+ req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
       Project.findOne(req.param('belongs_to_project'), function foundMilestone(err, project) {
            if (err) return next(err);
            if (!project) return next();
        Milestone.destroy(req.param('id')).exec(function() {
            //res.redirect("/milestone/");
            //res.redirect('/project/show/' + milestone.belongs_to_project );
        }
    );
         res.redirect('/project/show/' + project.id );
    });    
    
    }
};

