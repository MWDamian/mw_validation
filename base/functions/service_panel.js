function check_logindata(login,password){
	$.ajax({  
			type: "POST", 
			dataType: "json",
			url: '../php/check_login_data.php', 
			async: false,
			data: {
				login:login,
				password:password,
				},  
			success: function(data){ 
				alert(data.password_response);
				if(data.password_response == true){
					window.step_last('fadeIn', 'fadeOut', 'slow');
				}else{
					$(':inputs').each(function(index, element) {
						alert(this.id);
						$('body').prepend('<div class="infocloud" id="infocloud-'+this.id+'">Podany login lub hasło są nieprawidłoweasdaasd.</div>');
						$('#infocloud-'+this.id).fadeIn('fast');
						var offset = $('#'+this.id).offset();
						$('#infocloud-'+this.id).css('top',offset.top-$('#infocloud-'+this.id).outerHeight()-15+'px').css('left',offset.left+'px');
						setTimeout(function(){
							$('#infocloud-'+this.id).fadeOut('fast');
						},3000)
						$(this).addClass('validation_bad');
					});
				}
			}
		});
};	