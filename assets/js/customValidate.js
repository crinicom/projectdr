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
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-times form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
        }
    } );

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
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-times form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
        }
    } );


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
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-times form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
        }
    } );


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
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-times form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
        }
    } );


$('#risk-form').validate({
    rules: {
        description: {
            required: true
        },
        impact: {
            required: true
            
        },
        mitigation: {
            required: true
        }
       
    },
    messages: {
        description: {
            required: "Debe describir el riesgo percibido"
        },
        impact: {
            required: "Debe especificar cómo impacta el riesgo, de ocurrir, en este proyecto en particular"
            
        },
        mitigation: {
            
            required: "Debe ingresar un plan de mitigación de efectos del riesgo o el plan para eliminar o bajar la probabilidad de ocurrencia."
        }
    },
    errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-times form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='fa fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
        }
    } );





}); // FIN DE LA FUNCION VALIDATE


