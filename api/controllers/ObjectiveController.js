/**
 * ObjectiveController
 *
 * @description :: Server-side logic for managing objectives
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	"new": function(req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
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
            res.redirect('/objective/show/' + objective.id ); 
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
        Objective.find(function foundObjectives(err, objectives) {
            if (err) return next(err);
            
            res.view({objectives:objectives});
        });
    },
    
   
    edit: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, objective) {
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
        Objective.destroy(req.param('id')).exec(function() {
            res.redirect("/objective/");
        }
        );
    }
};

