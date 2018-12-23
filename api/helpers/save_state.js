module.exports = {
    friendlyName: 'Save project state',
    
    
      description: 'Save project state for state machine',
    
    
      inputs: {
    
        id: {
          type: 'number',
          example: '34',
          description: 'Project ID',
          required: true
        },
        key: {
            type: 'string',
            example: 'pcharter',
            description: 'State Key: pcharter/edt/stakeholders/risk/gantt',
            required: true
          },
          state: {
            type: 'string',
            example: 'wip',
            description: 'state: no/wip/finished',
            required: true
          }
    
      },
    
    
      fn: async function (inputs, exits) {
        Project.findOne(${inputs.id}, function foundProject(err, project) {
            if (err) {console.log("error");return next(err);
            }
            if (!project) {console.log("!project");return next();}
            
            //var project_obj = project.toObject();
            //var status = {};
            project.status[${inputs.key}] = ${inputs.state};
    
            //project.status = status;
    
            project.save(function(err){
                if (err) {
                    return res.json({err});
                } else {
                    console.log( '\n', ${inputs.key},'\n');
                    console.log( '\n',${inputs.state},'\n');
                    console.log( '\n', project.status,'\n');
                }
            });
    
        }); 
        return exits.success("ok: ", ${inputs.key}, " ",${inputs.state}, " ", project.status );
      }
    

};

