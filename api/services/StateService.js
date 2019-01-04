module.exports.SetState = function(obj = {}) {
    // console.log("obj en setstate antes del set: ", obj);
    var pro= Project.findOne({id:obj.id}, function foundProject(err, project) {
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
                // console.log( '\n savestate key ', obj.key,'\n');
                // console.log( '\n savestate state ',obj.state,'\n');
                // console.log( '\n savestate status', project.status,'\n');
                console.log("antes de salir del SAVE");
                return savedProject;
            }
        });
        return saved;
        //res.json({status});

    }); 
    return pro;
};