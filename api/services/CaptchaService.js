module.exports.loadCaptcha = function(resultado){
    captchaContainer = grecaptcha.render('captcha_box', {
      'sitekey' : '6LeUElIUAAAAAKQEyys7YjRTb7DUSXGA3AUA27PJ',
      'callback' : function(response) {
          $.ajax({
              url: "/user/validateCaptcha", // add appropriate action and sails.js controller here 
              data: 'response=' + response,
              success: function(msg){
                  
                  var scope = document.getElementById("submit");
                  scope.data = "<input type=\"submit\" class=\"btn btn-lg btn-primary btn-block\" value=\"Create User\" id=\"submit_button\" style=\"display:block\"><input type=\"hidden\" name=\"_csrf\" value=\"<%=_csrf%>\" />";
                  scope.querySelector("#texto").innerHTML = scope.data;
                  scope.IsCaptchaSuccess = true;
                  scope.responseCode = response;
                  
                  
              },
              error : function(msg){
                  grecaptcha.reset();
              }
         }).done(function(data) {
            
         });
      }
    });
  };