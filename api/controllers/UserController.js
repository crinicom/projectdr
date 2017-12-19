/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	"new": function(req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
    },
    create:function(req, res, next) {
        User.create(req.params.all(), function userCreated(err, user) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/user/new/');    
            }
            res.redirect('/user/show/' + user.id ); 
           // req.session.flash = {};
        });
    },

    show: function(req, res, next) {
        
        User.findOne(req.param('id')).populateAll().exec(function(err,user) {
            if (err) return next(err);
            if (!user) return next();
           res.view({user:user});
           //res.json(user);
        });
    },
    index: function(req, res, next) {
/* solo para ep13
        console.log(new Date());
        console.log(req.session.authenticated);
*/
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            
            res.view({users:users});
        });
    },
    
   
    edit: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({user:user});
        }); 
    },
    update: function(req, res, next) {
           User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/'+ req.param('id'));
            }
            return res.redirect('/user/show/'+ req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
        User.destroy(req.param('id')).exec(function() {
            res.redirect("/user/");
        }
        );
    }


};

