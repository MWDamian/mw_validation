
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

