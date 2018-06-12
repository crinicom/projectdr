/**
 * RiskController
 *
 * @description :: Server-side logic for managing risks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function(req, res, err) {
        Project.findOne(req.param('belongs_to_project'), function foundProject(err, project) {
            if (err) return next(err);
            if (!project) return next();

            res.view({project:project, assoc_stakeholder:req.param('assoc_stakeholder')});  
        });
    },
    create:function(req, res, next) {
       
         Risk.create(req.params.all(), function riskCreated(err, risk) {
             //if (err) return next(err);
             if (err) {
             
                 console.log(JSON.stringify(err)); 
                 req.session.flash = {
                     err: err
                 }
                 
                 return res.redirect('/risk/new/');    
             }
             
             var now = new Date(Date.now()).toLocaleString().split(', ')[0];
             var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                 date: now,
                 project: req.param('belongs_to_project')+';',
                 module: req.param('belongs_to') +';',
                 item: req.param('section')+';',
                 detail: 'Riesgo creado: ' + req.param('description') + '; ' + req.param('impact')+ req.param('mitigation')+';'
             };   
             Applog.create(log, function logCreated(err, applog) {
                 if (err) { console.log(JSON.stringify(err)); }
                 console.log(JSON.stringify(applog));
             });
             
             
             res.redirect('/project/risks/' + req.param('belongs_to_project') ); 
             
             //res.json(objective);
            // req.session.flash = {};
         });
     },
     edit: function(req, res, next) {
        Risk.findOne(req.param('id'), function foundRisk(err, risk) {
            if (err) return next(err);
            if (!risk) return next();
            res.view({risk:risk,belongs_to_project:req.param('belongs_to_project'), assoc_stakeholder:req.param('assoc_stakeholder')});
        }); 
    },
    assign: function(req, res, next) {
        Risk.findOne(req.param('id'), function foundRisk(err, risk) {
            if (err) return next(err);
            if (!risk) return next();
            res.view({risk:risk,belongs_to_project:req.param('belongs_to_project'), assoc_stakeholder:req.param('assoc_stakeholder')});
        }); 
     
    },

    update_assign: function(req, res, next) {
        Risk.update(req.param('id'), req.params.all(), function riskkUpdated(err) {
            if (err) {
                console.log(err);
                return res.redirect('/risk/assign/'+ req.param('id'));
            }
            res.redirect('/project/gantt/' + req.param('belongs_to_project') );
        }); 
    },
    update_status: function(req, res, next) {
        Risk.update(req.param('id'), req.params.all(), function riskkUpdated(err) {
            if (err) {
                console.log(err);
                res.redirect('/project/gantt/' + req.param('belongs_to_project') );
            }
            res.redirect('/project/gantt/' + req.param('belongs_to_project') );
        }); 
    },
    update: function(req, res, next) {
           Risk.update(req.param('id'), req.params.all(), function riskkUpdated(err) {
            if (err) {
                return res.redirect('/risk/edit/'+ req.param('id'));
            }
            res.redirect('/project/risks/' + req.param('belongs_to_project') );
        }); 
    },
    destroy: function(req,res,next) {
        Risk.destroy(req.param('id')).exec(function() {

            var now = new Date(Date.now()).toLocaleString().split(', ')[0];
            var log = {
                name: req.session.User.email+';' + ' id: ' + req.session.User.id+';',
                date: now,
                project: comes_from +';',
                module: 'n/a' +';',
                item: 'n/a'+';',
                detail: 'Riesgo: ' + req.param('id') + '; eliminado' +';'
            };   
            Applog.create(log, function logCreated(err, applog) {
                if (err) { console.log(JSON.stringify(err)); }
                console.log(JSON.stringify(applog));
            });

        res.redirect('/project/risks/' + req.param('belongs_to_project') );
    });    
    
    
    }
};

