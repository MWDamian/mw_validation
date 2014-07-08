var debug = false;
var clouds = true;
var global_email = '';
var table = '';
var confirmation_emails = '';
var additional_data = '';
var step_effect = ''
var save_form_data = '';
var current_step;
var user_confirmation_emails = '';

var google_conversion_id = '';
var google_conversion_label = '';
var google_conversion_value = '';
var google_conversion_language = "en";
var google_conversion_format = "3";
var google_conversion_color = "ffffff";
var google_remarketing_only = false;

var token = randomString();



/*
* import plików
* w przypadku błędu zostanie wywołany alert
*/
$('head').append('<link rel="stylesheet" href="http://resources.marketingwizards.pl/validation/1.1.2/css/default_validation_styles.css" type="text/css" />');
$.getScript( "http://resources.marketingwizards.pl/validation/1.1.2/functions/functions.js" );
	
/*
* zczytywanie parametrów _GET
*/

var pathname = $(location).attr('href');
var parametrs = pathname.split('?');
if(parametrs[1] != undefined &&  parametrs[1] != '') {
	var parametrs = parametrs[1].split('&');
	for (var i in parametrs){
		get_value_array = parametrs[i].split('=');
		
		/*
		* identyfikacja parametru debug
		*/
		if(get_value_array[0] == 'debug'){
			if(get_value_array[1] == 'true'){
				debug = true;
			}
		}
	}
}

$(document).ready(function(){
	
	/*
	* sprawdzenie wartości animacja dla stepów
	*/
	step_effect = step_effect.split(',');
		for( i in step_effect){
			step_effect[i] = $.trim(step_effect[i]);
		}
	if(step_effect != undefined && step_effect != ''){
		switch(step_effect[0])
		{
			case 'fadeIn':
				var step_effect1 = 'fadeIn';
				var step_effect2 = 'fadeOut'; 
			break;
			case 'slideDown':
				var step_effect1 = 'slideDown';
				var step_effect2 = 'slideUp';
			break;
			case 'show':
				var step_effect1 = 'show';
				var step_effect2 = 'hide';
			break;
			default:
				var step_effect1 = 'fadeIn';
				var step_effect2 = 'fadeOut';
			break;
		}
		var step_effect_duration = step_effect[1]
	}else{
		var step_effect1 = 'fadeIn';
		var step_effect2 = 'fadeOut'; 
		var step_effect_duration = 'fast';
	}
	
	/*
	* wykrywanie błędów
	*/	
	
	if(debug == true){
		window.validation_errors();	
	}	
	
	/*
	* walidacja po zmianie wartość pola
	*/
	$(".validate").change(function() {
		if(!$(this).is(':button')){
			window.validation_check(this.id, 'change');
		}
	});	
	$(".validate").blur(function() {
		if(!$(this).is(':button')){
			window.validation_check(this.id, 'blur');
		}
	});
	$(".validate").click(function() {
		//window.validation_check(this.id, 'click');
		window.validation_check_button(this.id, step_effect1, step_effect2, step_effect_duration, 'click');
	});	
	var script_loaded = false;
	$(".validate").each(function(index, element) {
		
        if($(this).data('mask')){
			if(script_loaded == false){
				$.ajax({
					type: "GET", 
					url:'http://resources.marketingwizards.pl/validation/1.1.2/js/jquery.maskedinput.min.js',
					data :'',
					async:false,
					dataType:"script",
					success: function(data){ 
						script_loaded = true;
						$(".validate").each(function(index, element){
							if($(this).data('mask')){
								$(this).mask($(this).data('mask'));
							}
						});
					}
				})
			}
		}
    });
	
});


/*
* funkcja validation_errors
* wykrywanie błędów
*/
function validation_errors(id, error_code){
	if(code == undefined){
		var code = '';
	}
	switch (code){
		case 000:
			alert('brak ustawionego parametru data-form ( błąd w polu: '+id+' )');
		break;
		case 001:
			alert('brak ustawionego parametru data-form ( błąd w polu: '+id+' )');
		break;
		case 002:
			alert('brak ustawionego parametru data-form ( błąd w polu: '+id+' )');
		break;
		case 003:
			alert('brak ustawionego parametru data-form ( błąd w polu: '+id+' )');
		break;
		}
	
	$(".validate").each(function(index) {
		
		/*
		* Kontrola błędów na wypadek gdyby znaleziono zduplikowanie identyfikatory
		*/	
		var counter = 0;
		var id_1 = this.id;
		$(".validate").each(function(index) {
			var id_2 = this.id;
			if(id_1 == id_2){
				counter++;
				if(counter > 1)
				{
					alert('Znaleziono zduplikowanie identyfikatory ( '+this.id+' zduplikowany )');
				}
			}
		});
		
		
		
		var button = false;
       
	    /*
		* Kontrola błędów na wypadek gdyby użytkownik nie podał żadnych danych typu data
		* W przypadku błędu skrypt wywoła alert z id błędnego pola formualarza
		*/		
		if(!$('#'+this.id).attr('data-validation')){
			if(!$('#'+this.id).attr('data-button')){
				alert('W polu (id="'+this.id+'") brakuje danych typu data-, uzupełnij dane lub wyłącz klasę "validate" dla tego pola.');
			}
		} 
		
		var data_button = $('#'+this.id).data('button');
		if(data_button != undefined &&  data_button != '') {
			button = true;
		}
		
		/*
		* Kontrola błędów na wypadek gdyby użytkownik podał błędny sposób walidacji
		* W przypadku błędu skrypt wywoła alert z id błędnego pola formualarza
		*/
		if(button == false){
			var data = $('#'+this.id).data('validation');
			data = data.split(',');
			for (var i in data){
				data[i] = $.trim(data[i]);
			}
			var fnc = 'validation_'+data[0];
			var stp =  parseInt(data[1]);
			var dir =  data[2];	
			
			//błędy uniwersalne
			//data[1] - zbyt dużo stepów
			if(stp > 9){
				alert(stp+' to zbyt duza liczba stepów, maksymalna ilość stepów to 9 ( błąd w polu: '+this.id+' )');
			}
			//data[1] - za mała wrtość stepu
			if(stp < 0){
				alert(stp+' to zbyt mała wartość dla pola "step", mininalna wartość dla pola to 1 ( błąd w polu: '+this.id+' )');
			}
			//data[2] - złe miejsce chmurki
			if(dir != 'left' && dir != 'right' && dir != 'top' && dir != 'bottom'){
				alert(dir+' to nieprawidłowe miejsce wyświetlanie chmurki z podpowiedzią ( błąd w polu: '+this.id+' )');
			}
			
			//błędy pola typu input
			if(!$('#'+this.id).is(':checkbox')){
				//data[0] nie jest funckją
				if (!$.isFunction(window[fnc])){
					alert('sposób walidacji: "'+data[0]+'" nie istnieje ( błąd w polu: '+this.id+' )');
				};	
			}
			
			//błędy pola typu checkbox
			if($('#'+this.id).is(':checkbox')){
				
				//data[0] zły tryb walidacji
				if (data[0] != 'required' && data[0] != 'optional'){
					alert('tryb walidacji pola checkbox: "'+data[0]+'" jest błędny ( błąd w polu: '+this.id+' )');
				};	
				//data[0] zły tryb zapisu
				if (data[1] != 'save' && data[1] != 'no-save'){
					alert('tryb zapisu pola checkbox: "'+data[1]+'" jest błędny ( błąd w polu: '+this.id+' )');
				};
			}	
		};
		
		
    });
};


/*
* funkcja validation_check
* głowna funkcja sterująca całym procesem validacji
*/
function validation_check(id, source){
	/*
	* Odczyt danych typu data z pola formularza, usunięcie białych znaków i umieszczenie w tablicy "data"
	*/	
	var data = $('#'+id).data('validation');
	data = $.trim(data);
	data = data.split(',');
			
	/*
	* Sprawdzenie czy podany jest opcjonalny argument "label"
	*/
	if($( '#'+id ).attr('data-label') != '' && $( '#'+id ).attr('data-label') != undefined){
		var label = $( '#'+id ).data('label');
	}else{
		var label = "default";
	}
	
	var cloud = 'validationcloud_'+id;
	
	/*
	* wybór efektu dla pojawiania się chmurek
	*/
	if($('#'+id).attr('data-cloud_effect')){
		var data_cloud_effect = $('#'+id).data('cloud_effect');
		data_cloud_effect = data_cloud_effect.split(',');
		for( i in data_cloud_effect){
			data_cloud_effect[i] = $.trim(data_cloud_effect[i]);
		}
		switch(data_cloud_effect[0])
		{
			case 'fadeIn':
				var effect1 = 'fadeIn';
				var effect2 = 'fadeOut'; 
			break;
			case 'slideDown':
				var effect1 = 'slideDown';
				var effect2 = 'slideUp';
			break;
			case 'show':
				var effect1 = 'show';
				var effect2 = 'hide';
			break;
			default:
				var effect1 = 'fadeIn';
				var effect2 = 'fadeOut';
			break;
		}
		var duration = data_cloud_effect[1];
	}else{
		var effect1 = 'fadeIn';
		var effect2 = 'fadeOut'; 
		var duration = 'slow';
	}
	if($('#'+id).is(':checkbox')){

		/*
		* Sprawdzenie czy funckja nie została wywołana z akcji blur
		*/
		if(source != 'blur'){
			
			/*
			* Sprawdzenie czy pole jest oznaczone jako wymagane 
			*/
			if(data[0] == 'required'){
				
				/*
				* Wywołanie odpowiedniej funkcji walidacji pola checkbox 
				*/
				if(window.validation_checkbox($('#'+id).prop('checked')).check){
					window.validation_good( id, cloud, effect2, duration, 'checkbox' );
					return true;
				}else{
					window.validation_bad( id , window.validation_checkbox($('#'+id).prop('checked'),label).label, cloud, effect1, effect2, duration, 'checkbox');
					return false;
				};
			}else{
				return true;
			}
		}
	}else{
		
		
		/*
		* Wywołanie odpowiedniej funkcji walidacji pola input według pierwsego atrybutu data
		*/	
		//alert(data[0])
		if(data[0] !== 'optional'){
			var fnc = 'validation_'+data[0];
			if(window[fnc]($('#'+id).val()).check){
				window.validation_good( id, cloud, effect2, duration, 'input' );
				return true;
			}else{
				window.validation_bad( id , window[fnc]($('#'+id).val(),label).label, cloud, effect1, effect2, duration, 'input');
				return false;
			};
		}else{
			window.validation_good( id, cloud, effect2, duration, 'input' );
			return true;
		}
	}
};
	
/*
* funkcja validation_bad
* akcje w przypadku wykrycia złej walidacji
*/
function validation_bad(id, label, cloud, effect1, effect2, duration, type){	

	/*
	* dodanie kalsy css
	*/
	if(type == 'checkbox'){
		$('#'+id).addClass('validation_bad_checkbox').removeClass('validation_good_checkbox');
	}else{
		$('#'+id).addClass('validation_bad').removeClass('validation_good');
	}

	/*
	* rozmieszczanie chmurek z informacjami
	*/
	if(clouds == true){
		$('#'+cloud).remove();
		$('#'+id).parent().append('<article class="validation_cloud" id="'+cloud+'">'+label+'</article>');
		var position = $('#'+id).position();
		
		/*
		* odczytywanie miejsca w którym ma zostać wyświetlona churka
		*/
		var data = $('#'+id).data('validation');
		data = data.split(',');
		for( i in data){
			data[i] = $.trim(data[i]);
		}
		
		/*
		* ustawianie chmurki wg. podanej wartrości
		*/
		var offset = 15;
		var place = data[2];
		switch(place){
			case 'left':
				$('#'+cloud).css('height',$('#'+id).outerHeight()+'px').css('line-height',$('#'+id).outerHeight()+'px');
				$('#'+cloud).css('top',position.top+'px').css('left', position.left - $('#'+cloud).outerWidth()-offset+'px');
			break;
			case 'right':
				$('#'+cloud).css('height',$('#'+id).outerHeight()+'px').css('line-height',$('#'+id).outerHeight()+'px');
				$('#'+cloud).css('top',position.top+'px').css('left', position.left + $('#'+id).outerWidth()+offset+'px');
			break;
			case 'top':
				var padding_left  = parseInt($('#'+cloud).css('padding-left' ), 10);
				var padding_right = parseInt($('#'+cloud).css('padding-right'), 10);
				$('#'+cloud).css('width',$('#'+id).outerWidth() - padding_left - padding_right +'px');
				$('#'+cloud).css('height',$('#'+id).height()+'px').css('line-height',$('#'+id).height()+'px');
				$('#'+cloud).css('top',position.top-$('#'+id).height()-offset/2+'px').css('left', position.left +'px');
			break;
			case 'bottom':
				var padding_left  = parseInt($('#'+cloud).css('padding-left' ), 10);
				var padding_right = parseInt($('#'+cloud).css('padding-right'), 10);
				$('#'+cloud).css('height',$('#'+id).height()+'px').css('line-height',$('#'+id).height()+'px');
				$('#'+cloud).css('width',$('#'+id).outerWidth() - padding_left - padding_right +'px');
				$('#'+cloud).css('top',position.top+$('#'+id).height()+offset+'px').css('left', position.left+'px');
			break;
			default:
				$('#'+cloud).css('height',$('#'+id).outerHeight()+'px').css('line-height',$('#'+id).outerHeight()+'px');
				$('#'+cloud).css('top',position.top+'px').css('left', position.left - $('#'+cloud).outerWidth()-offset+'px');
			break;
		}
		
		/*
		* schowanie chmurki po 2,5s
		*/
		
		if(window['#'+cloud+'timeout'] == undefined && window[cloud+'timeout'] == ''){
			window['#'+cloud+'timeout'] = '';
		}
		clearTimeout(window['#'+cloud+'timeout']);  	
		cloud_animation = $('#'+cloud)[effect1](duration, 0 ,
			function(){
				window['#'+cloud+'timeout'] = setTimeout(function(){
					$('#'+cloud)[effect2](duration)
					}, 2500);
		});
	}
};

/*
* funkcja validation_good
* akcje w przypadku wykrycia dobrej walidacji
*/
function validation_good(id, cloud, effect2, duration, type){
	/*
	* dodanie kalsy css
	*/
	if(type == 'checkbox'){
		$('#'+id).addClass('validation_good_checkbox').removeClass('validation_bad_checkbox');
	}else{
		$('#'+id).addClass('validation_good').removeClass('validation_bad');
	}
	/*
	* schowanie chmurki
	*/
	$('#'+cloud)[effect2](duration);
};




/*
* funkcja validation_check_button
* głowna funkcja sterująca całym procesem validacji buttonów
*/
function validation_check_button(id, step_effect1, step_effect2, step_effect_duration, source){
	
	
	/*
	* Sprawdzenie czy kliknięty elemnt jest buttonem
	*/
	var data_button = $('#'+id).data('button');
	if(data_button != undefined &&  data_button != '') {
		/*
		* reset liczby złych inputów
		*/
		var bad_validation = 0;
		
		$('.validate').each(function(index, element) {
			
			/*
			* Wykluczanie ze sprawdzania klikniętego buttona
			*/
			if(this.id != id){
				
				/*
				* Wykluczanie ze sprawdzania ukrytych stepów
				*/
				if($('#'+this.id).is(":visible")){
					
					/*
					* Sprawdzenie czy istnieje wiele formularzy
					*/
					if($('#'+id).attr('data-form')){
						
						/*
						* Obsługa błędu, jeśli któryś z pól formularza nie ma ustawionego parametru data-form
						* 000 - brak ustawionego parametru data-form
						*/
						if(!$('#'+this.id).data('form')){
							window.validation_errors($('#'+this.id), '000');
						}
						
						
						var data_form_id = $('#'+id).data('form');
						data_form_id = data_form_id.split(',');
							for( i in data_form_id){
								data_form_id[i] = $.trim(data_form_id[i]);
							}
				
							var data_form_idform = $('#'+this.id).data('form');
							data_form_idform = data_form_idform.split(',');
							for( i in data_form_idform){
								data_form_idform[i] = $.trim(data_form_idform[i]);
							}
							
						var data_form = data_form_id[0];
						
						/*
						* Sprawdzanie formularzy z tym samym data_form_id co kliknięty button
						*/
						if(data_form_id[0] == data_form_idform[0]){
							if($('#'+this.id).attr('data-validation')){
								var data = $('#'+this.id).data('validation');
								data = data.split(',');
								for( i in data){
									data[i] = $.trim(data[i]);
								}
								
								/*
								* Sprawdzanie czy pole nie jest opcjonalne
								*/
								if(data[0] != 'optional'){
									if(!window.validation_check(this.id, 'internal')){
										bad_validation++;
									}
								}
							}
						}
					}else{
						
						/*
						* Zliczanie błędnie wypełnionych pól
						*/
						
						var data = $(this).data('validation');
						data = data.split(',');
						for( i in data){
							data[i] = $.trim(data[i]);
						}
						
						//if(data[0] != 'optional'){
							if(!window.validation_check(this.id, 'internal')){
								bad_validation++;
							}
						//}
					}
				}
			}
        });
		if(bad_validation == 0){
			window.next_step(id, step_effect1, step_effect2, step_effect_duration);
		}
	}
};

/*
* funkcja check_steps
* funkcja sterująca wyświetlaniem stepów
*/
function next_step(id, step_effect1, step_effect2, step_effect_duration){
	
	/*
	* Odczyt aktualnego stepu
	*/
	var current_step;
	var current_step_number;
	var next_step;
	var next_step_number;
	var highest_step;
	var highest_step_number = 0;
	
	/*
	* Odczyt aktualnego i następnego stepu
	*/
	$('.step').each(function(index, element) {
		if($(this).is(':visible')){
			current_step = this.id;
			step_number_splitted =  this.id.split('_')
			current_step_number = parseInt(step_number_splitted[1]);
			next_step_number = parseInt(step_number_splitted[1])+1;
			next_step = 'step_'+next_step_number;
		}
    });	
				
	/*
	* Odczyt największego stepu
	*/
	$('.step').each(function(index, element) {	
		step_number_splitted =  this.id.split('_')
		step_number = parseInt(step_number_splitted[1]);
		
		if(step_number > highest_step_number){
			highest_step_number = step_number;
			highest_step = 'step_'+highest_step_number;
		};
	});
	
	console.log('current_step: '+current_step+' - current_step_number: '+current_step_number);
	console.log('next_step: '+next_step+' - next_step_number: '+next_step_number);
	console.log('highest_step: '+highest_step+' - highest_step_number: '+highest_step_number);
	
	/*
	* pokazywanie nastepnego stepu
	*/	
	if($('#'+id).attr('data-form')){
		var data_form_id = $('#'+id).data('form');
		data_form_id = data_form_id.split(',');
		for( i in data_form_id ){
			data_form_id[i] = $.trim(data_form_id[i]);
		}
		var data_form = data_form_id[0];
	}else{
		var data_form = '';
	}
	
	window.send_form(step_effect1, step_effect2, step_effect_duration, data_form);	
	
	$('#'+current_step)[step_effect2](step_effect_duration,function(){
		var callback_function_name = 'step'+current_step_number+'_callback'
		try {
			window[callback_function_name]();
		} catch(e) {
			//console.log('not exist');
		}
		
		$('#'+next_step)[step_effect1](step_effect_duration);
	});	
	
	if(current_step_number < highest_step_number){				
		
	}else{	
		if($('#'+current_step).is(":visible")){
			$('#'+current_step)[step_effect2](step_effect_duration, 0 , function(){
				$('#step_last')[step_effect1](step_effect_duration);
			});
		}
	}
	
}



/*
* funkcja send
* funkcja sterująca wysyłaniem formularza
*/
function send_form(step_effect1, step_effect2, step_effect_duration, data_form){

	console.log('preparing for sending form');
	/*
	* definiowanie tablic 
	*/
	var value_array  = [];
	var id_array  = [];

	if(table != 'external'){
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
		
		/*
		* zczytywanie dodatkowych danych z _GET i dopisywanie jest do tablicy, która będzie wysłana do bazy danych
		*/
		if(additional_data != undefined &&  additional_data != '') {
			additional_data = additional_data.split(',');
			for(var i in additional_data){
				$.trim(additional_data[i]);
			};
			for( i in additional_data){
				for (j in parametrs){
					parametrs_value_array = parametrs[j].split('=');
					if(additional_data[i] == parametrs_value_array[0]){
						id_array.push(parametrs_value_array[0]);
						value_array.push(parametrs_value_array[1]);
					}
				}
			}
		}
		
		
		
		/*
		* dodanie informacji którego formularza użyto
		*/
		if(save_form_data){
			id_array.push('save_form_data');
			value_array.push(data_form);
		}
		
		/*
		* dodanie tokena 
		*/
		id_array.push('token');
		value_array.push(token);
		console.log('form are sending');
		$.post(
			'http://resources.marketingwizards.pl/validation/1.1.2/FormToDatabase.php',{ 
			 fields: id_array, 
			 values: value_array,
			 table: table,
			 },
			 function(data) { 
				if(debug == true){
					alert(data);
				}
				console.log('form was sent');
				
			 }
		)
		if(confirmation_emails != ''){
			$.post(
				 'http://resources.marketingwizards.pl/validation/1.1.2/SendConfimation.php',{ 
				 fields: id_array, 
				 values: value_array,
				 confirmation_emails: confirmation_emails,
				 title:  document.title,
				 },
				 function(data) { 
					if(debug == true){
						alert(data);
					}
			 	 }
			 )
		}
		if(user_confirmation_emails == true){
			
			$.post(
				 user_confirmation_emails_href,{ 
				 user_email: global_email, 
				 },
				 function(data) {
			 	 }
			 )
		}
		if(google_conversion_id != ''){
			window.count_conversion(google_conversion_id, google_conversion_label, google_conversion_value);
			
		}
	}
	
	/*
	* Customowe rodzaje wysyłania formularza
	*/
	
	else{
		//alert('external');
	}
}
/*
* funkcja step_las
* chowa wszystkie stepy i pokazuje tylko ostatni
*/
function step_last(step_effect1, step_effect2, step_effect_duration){
	
};


function count_conversion(id, label, value){
	document.write = function(text) {
		$('body').append(text);
	};
	window.google_conversion_id = id;
	window.google_conversion_label = label;
	window.google_conversion_value = value;
	$.getScript('https://www.googleadservices.com/pagead/conversion.js');
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 12;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}




