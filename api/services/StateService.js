//var Promise = require('bluebird');

module.exports.SetState = function(ref_id = 0, states=[]) {
    // console.log("obj en setstate antes del set: ", obj);
    console.log(states);
    var pro = Project.findOne({id:ref_id}, function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        console.log(project);
        
        var stat={};
        
        stat = project.status;
        
        console.log(states);

        for(var i=0;i < states.length; i++) {
            console.log("onestate ", states[i].key, " ", states[i].state);
            project.status[states[i].key]=states[i].state;
        }
                
        Project.update({id: ref_id},{status: project.status}).exec(function afterwards(err, updated){
           if (err) return;
           
                     
        return "ok";
        });

        // project.save(function(err, savedProject){
        //     if (err) {
        //         console.log(err);
        //         return err;
        //     } else {
        //         console.log("antes de salir del SAVE: ", project.status);
        //         return savedProject;
        //     }
        // });


    });
    
    
    
    
    
    
    
    
    
    
   /*  var pro = Project.findOne({id:obj.id}, function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        
        project.status[obj.key] = obj.state;
        console.log("status en setstate, antes: ", obj);
        console.log("status en setstate, antes: ", project.status);
        var saved = project.save(function(err, savedProject){
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log("antes de salir del SAVE");
                return savedProject;
            }
        });
        return saved;
        //res.json({status});

    }); 
    return "ok"; */
    
};