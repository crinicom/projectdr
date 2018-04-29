$(document).ready(function(){

    $('#sign-up-form').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            passw: {
                minlength: 3,
                required: true
            },
            confirmation: {
                minlength: 3,
                required: true,
                equalTo: "#passw"
            }
        },
        messages: {
            name: {
                required: "Debe ingresar un nombre de usuario"
            },
            email: {
                required: "Debe ingresar un correo",
                email: "Formato de correo erróneo"
            },
            passw: {
                minlength: "La contraseña debe tener mínimo 3 caracteres",
                required: "Debe ingresar una contraseña"
            },
            confirmation: {
                minlength:  "La contraseña debe tener mínimo 3 caracteres",
                required: "Debe comprobar una contraseña",
                equalTo: "Ingrese la misma contraseña en el campo de comprobación"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });

    $('#stk-form').validate({
        rules: {
            name: {
                required: true
            },
            mails: {
                required: false,
                email: true
            },
            comm_plan: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Debe ingresar un nombre o equipo de trabajo interesado (stakeholder)"
            },
            email: {
                
                email: "Formato de correo erróneo"
            },
            comm_plan: {
                
                required: "Debe indicar cómo gesionará este stakeholder"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });


    $('#new-obj-form').validate({
        rules: {
            description: {
                required: true
            },
            formula: {
                required: true
                
            },
            goal: {
                required: true
            }
           
        },
        messages: {
            description: {
                required: "Debe describir el objetivo a lograr"
            },
            formula: {
                required: "Debe especificar la fórmula de cálculo"
                
            },
            goal: {
                
                required: "Debe ingresar una meta esperada"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });


    $('#task-form').validate({
        rules: {
            text: {
                required: true
            }
           
        },
        messages: {
            text: {
                required: "Debe describir la tarea"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });

});