
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
function validation_namesurname(val, label){
	if(label == "default"){
		label = "Podaj poprawne imię i nazwisko";
	};
	var check =  val.match(/\S{3,16}\s\S{3,16}/);
	if(check == null){	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
}
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
function validation_emailexist(val, label){
	
	global_email = val;
	
	if(label == "default"){
		label = "Podaj poprawny adres email";
	};
	var check =  val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);;	
	if(check == null){	
		return {check:false, label:label};
	}else{
		var ajax_response;
		$.ajax({
			type : "POST",
			url  : 'http://resources.marketingwizards.pl/validation/1.1.6/php/check_email.php',
			dataType : "JSON",
			async: false,
			data:{
				email: val,
				table: table
			},
			success: function(data){
				console.log(data)
				ajax_response = data;
			}			
		});
		
		if(ajax_response.email_unique == true){
			return {check:true};
		}else{
			return {check:false, label:'Podany adres e-mail został jest już zarejestrowany'};
		}
		
	};
};
function validation_phone(val, label){
	
	if(label == "default"){
		label = "Podaj poprawny numer telefonu";
	};
	while (val.indexOf("+48") >= 0){
		val = val.replace('+48','')
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
function validation_phonelong(val, label){
	
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
function validation_zipcode(val, label){
	
	if(label == "default"){
		label = "Podaj poprawny kod pocztowy";
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
	var check =  val.match(/[0-9]{5}/);	
	if(check == null){	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
function validation_select(val, label){
	
	if(label == "default"){
		label = "Wybierz poprawne pole";
	};
	//alert('val '+val);
	if(val === '' || val === null || val === 0 || val === '0'){
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

