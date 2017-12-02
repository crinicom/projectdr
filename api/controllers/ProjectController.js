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
    }
};

