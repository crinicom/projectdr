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

            res.view({ user:user});
        });
    },
    create: function(req, res, next) {
        Project.create(req.params.all(), function projectCreated(err, project) {
            if (err) return next(err);
            
            //res.json(project);
         res.redirect('/user/show/'+project.owner);
        });
    }
};

