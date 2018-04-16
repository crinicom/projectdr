/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, err) {
        var belongs_to_project = req.param('belongs_to_project');
        var belongs_to = req.param('belongs_to');
        var section = req.param('section');
        var item = req.param('item');
        var comes_from = req.param('comes_from'); // funciona!! me permite saber de que URL llamè el new
        console.log(comes_from);
        res.view({belongs_to_project:belongs_to_project,belongs_to:belongs_to, comes_from:comes_from, item:item, section:section});
/* 
        Comment.findOne(req.param('belongs_to'), function foundComment(err, comment) {
            if (err) return next(err);
            if (!comment) return next();

            res.view({comment:comment});  
        }); */
    },
    create:function(req, res, next) {
        Comment.create(req.params.all(), function commentCreated(err, comment) {
            //if (err) return next(err);
            if (err) {
            
                console.log(JSON.stringify(err)); 
                req.session.flash = {
                    err: err
                }
                
                return res.redirect('/comment/new/');  //si hay un error redirecciono a la página de creación
            }
            //si está todo bien lo ideal sería redireccionar a la misma URL desde donde salí, incluso como AJAX
            
            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.param('user_name') + '; id: ' + req.param('user')+';',
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


            console.log(req.param("comes_from"));
            res.redirect(req.param("comes_from"));
            
        });
    },

    show: function(req, res, next) {
        
        Comment.findOne(req.param('id'), function(err,comment) {
            if (err) return next(err);
            if (!comment) return next();
           res.view({comment:comment});
           //res.json(user);
        });
    },
    index: function(req, res, next) {
       
            // res.json(project); solo check
            Comment.find(function foundComments(err, comments) {
                if (err) return next(err);
                
                res.view({comments:comments});
            });
       
    },
    
   
    edit: function(req, res, next) {
        Comment.findOne(req.param('id'), function foundComment(err, comment) {
            if (err) return next(err);
            if (!comment) return next();
            var comes_from = req.param('comes_from');

            res.view({comment:comment, comes_from:comes_from});
        }); 
    },
    update: function(req, res, next) {
           Comment.update(req.param('id'), req.params.all(), function taskUpdated(err) {
            if (err) {
                return res.redirect('/comment/edit/'+ req.param('id'));
            }
            res.redirect('/comment/show/' + req.param('id'));
        }); 
    },
    destroy: function(req,res,next) {
    Comment.destroy(req.param('id')).exec(function() {
        var comes_from = req.param('comes_from');
        
        var now = new Date(Date.now()).toLocaleString().split(', ')[0];
        var log = {
            name: session.user+';',
            date: now+';',
            project: comes_from +';',
            module: 'n/a' +';',
            item: 'n/a'+';',
            detail: 'Comentario: ' + req.param('id') + '; eliminado' +';'
        };   
        Applog.create(log, function logCreated(err, applog) {
            if (err) { console.log(JSON.stringify(err)); }
            console.log(JSON.stringify(applog));
        });
        res.redirect(comes_from);
    });    
    
    
    }
};

