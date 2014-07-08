
/*
*************************************
* wzór funkcji walidacji
* funkcja validation_notempty
* walidacja - pole nie może być puste
*************************************

function validation_notempty(val, label){
	
	*
	* wartość domyślna dla pola label
	*
	if(label == "default"){
		label = "Uzupełnij pole";
	};
	
	*
	* sprawdzanie wartośći
	*
	var check =  val.match(/^[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/ );
	
	*
	* wynik
	*
	if(check == null){	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
*****************************************************
*/
function validation_checkbox(val, label){
	
	if(label == "default"){
		label = "Zaznacz pole";
	};
	if(val == false){
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_notempty(val, label){
	
	if(label == "default"){
		label = "Uzupełnij pole";
	};
	//alert('val '+val);
	if(val === '' || val === null){
		check = null;
	}else{
		check = true;
	}
	//alert('check '+check);
	if(check == null){	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_name(val, label){
	
	if(label == "default"){
		label = "Podaj poprawne imię";
	};
	var check =  val.match(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,16}$/ );	
	if(check == null){	
	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_email(val, label){
	
	global_email = val;
	
	if(label == "default"){
		label = "Podaj poprawny adres email";
	};
	var check =  val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);;	
	if(check == null){	
	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_phone(val, label){
	
	if(label == "default"){
		label = "Podaj poprawny numer telefonu";
	};
	while (val.indexOf("-") >= 0){
		val = val.replace('-','')
	};
	while (val.indexOf(" ") >= 0){
		val = val.replace(' ','')
	};
	while (val.indexOf("_") >= 0){
		val = val.replace('_','')
	};
	var check =  val.match(/[0-9]{9}/);	
	if(check == null){	
	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_kod_groupon_as(val, label){
	var status = false;
	if(val !== ''){		
		$.ajax({
			 url: 'http://resources.marketingwizards.pl/validation/1.1.1/functions/check_groupon_kod_as.php',
			 type: "POST",
			 async: false,
			 data: {value: val}, 
			 success: function(data) { 
				if(debug == true){
					alert(data.response);
				}
				switch (data.response){
					case 'code_ok':
						status = true;
					break;
					case 'code_already_used':
						label = 'Ten kod został już wcześniej użyty';
						status = false;
					break;
					case 'code_doesnt_exist':
						label = 'Kod, jest niepoprawny';
						status = false;
					break;
				}
			 } 
		});

		if(status == false){
			return {check:false, label:label};
		}
		if(status == true){
			return {check:true};
		}
	}else{
		label = 'Uzupełnij pole';
		return {check:false, label:label};
	}
	
	
};
