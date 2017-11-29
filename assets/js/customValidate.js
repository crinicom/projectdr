$.(document).ready(function(){

    $('#sign-up-form').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            pswd: {
                minlength: 6,
                required: true
            },
            confirmation: {
                minlength: 6,
                equalTo: "#pswd"
            }
        },
        success: function(element){
            element
            .text('OK!').addClass('valid')

        }

    });
});