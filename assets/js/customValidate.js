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
                minlength: 6,
                required: true
            },
            confirmation: {
                minlength: 6,
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
                minlength: "La contraseña debe tener mínimo 6 caracteres",
                required: "Debe ingresar una contraseña"
            },
            confirmation: {
                minlength:  "La contraseña debe tener mínimo 6 caracteres",
                required: "Debe comprobar una contraseña",
                equalTo: "Ingrese la misma contraseña en el campo de comprobación"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });
});