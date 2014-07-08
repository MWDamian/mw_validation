function westwing(){
	var value_array  = [];
	var id_array  = [];
	$('.validate').each(function(index, element) {
		data = $('#'+this.id).data('validation');
		if(data != undefined &&  data != '') {
			data = data.split(',');
			for(var i in data){
				data[i] = $.trim(data[i]);
			};
				
			/*
			* sprawdzenie czy pole ma zostać zapisane
			*/
			if(data[1] !== 'no-save'){
					
				/*
				* uzupełnianie tablic danymi
				*/
				id_array.push(this.id)
					
				if(data[1] === 'save'){
					value_array.push($('#'+this.id).prop('checked').toString());
				}else{
					value_array.push($('#'+this.id).val());
				}
			}
		}
	});
		
	
	var password = window.Random_password();
	window.Mailing("Użytkownik", "Anonimowy", "female", value_array[0], password);
}
function Random_password(){
		var n = 8;				
		var password = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
		for(var i=0; i < n; i++)
		{
			password += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return password;
	}
	
	function Mailing(name, lastname, gender, email, password){
		$.post(
			"php/mailing.php",
			{
				email:email,
				password:password
			},
			function(data) {	
				$('body').append('<form id="forward_form" action="https://www.westwing.pl/customer/account/create/?'+query_string+'" name="create" method="post" style="display:none;"><input type="hidden" name="YII_CSRF_TOKEN" id="token" value="'+csrf_token+'"><input type="hidden" name="RegistrationForm[gender]" value="'+gender+'"><input type="hidden" name="RegistrationForm[first_name]" value="'+name+'"><input type="hidden" name="RegistrationForm[last_name]" value="'+lastname+'"><input type="hidden" name="RegistrationForm[email]" value="'+email+'"><input type="hidden" name="RegistrationForm[password]" value="'+password+'"><input type="hidden" name="RegistrationForm[agb]" value="0"><input type="hidden" name="RegistrationForm[agb]" value="1"><input type="hidden" name="additionalCheck" value="on"></form>');
				$('#forward_form').submit();
			}
		)	
	};	