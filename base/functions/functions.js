
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
	var check =  val.match(/^[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ()._-\s]/ );	
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
	var check =  val.match(/[0-9]{9}/);	
	if(check == null){	
	
		return {check:false, label:label};
	}else{
		return {check:true};
	};
};
