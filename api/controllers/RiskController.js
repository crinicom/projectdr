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
             res.redirect('/project/risks/' + req.param('belongs_to_project') ); 
             
             //res.json(objective);
            // req.session.flash = {};
         });
     },
};

