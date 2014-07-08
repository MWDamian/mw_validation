var clouds = true;
var global_email = '';
var table = '';
var confirmation_emails = '';
var additional_data = '';
var step_effect = ''
var save_form_data = '';
var current_step;
var user_confirmation_emails = '';
var step_effect1 = '';
var step_effect2 = ''; 
var step_effect_duration = '';

var token = randomString();
var google_conversion= new Object();
google_conversion.value = '';
google_conversion.format = '2';
google_conversion.color = 'ffffff';
google_conversion.language = "en";
google_conversion.remarketing = false;

var custom_email_data = new Object();
var url_source = window.location.origin;



/*
* import plików
* w przypadku błędu zostanie wywołany alert
*/
$('head').append('<link rel="stylesheet" href="http://resources.marketingwizards.pl/validation/1.1.6/css/default_validation_styles.css" type="text/css" />');
$.getScript( "http://resources.marketingwizards.pl/validation/1.1.6/functions/functions.js" );
	
var pathname = $(location).attr('href');
var parametrs = pathname.split('?');
if(parametrs[1] != undefined &&  parametrs[1] != '') {
	var parametrs = parametrs[1].split('&');
	for (var i in parametrs){
		get_value_array = parametrs[i].split('=');
		
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
				step_effect1 = 'fadeIn';
				step_effect2 = 'fadeOut'; 
			break;
			case 'slideDown':
				step_effect1 = 'slideDown';
				step_effect2 = 'slideUp';
			break;
			case 'show':
				step_effect1 = 'show';
				step_effect2 = 'hide';
			break;
			default:
				step_effect1 = 'fadeIn';
				step_effect2 = 'fadeOut';
			break;
		}
		step_effect_duration = step_effect[1]
	}else{
		step_effect1 = 'fadeIn';
		step_effect2 = 'fadeOut'; 
		step_effect_duration = 'fast';
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
	$(":button").click(function() {
		//window.validation_check(this.id, 'click');
		window.validation_check_button(this, step_effect1, step_effect2, step_effect_duration, 'click');
	});	
	var script_loaded = false;
	$(".validate").each(function(index, element) {
		
        if($(this).data('mask')){
			if(script_loaded == false){
				$.ajax({
					type: "GET", 
					url:'http://resources.marketingwizards.pl/validation/1.1.6/js/jquery.maskedinput.min.js',
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
		var place = data[1];
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
				$('#'+cloud).css('min-width',$('#'+id).outerWidth() - padding_left - padding_right +'px');
				$('#'+cloud).css('height',$('#'+id).height()+'px').css('line-height',$('#'+id).height()+'px');
				$('#'+cloud).css('top',position.top-$('#'+id).height()-offset/2+'px').css('left', position.left +'px');
			break;
			case 'bottom':
				var padding_left  = parseInt($('#'+cloud).css('padding-left' ), 10);
				var padding_right = parseInt($('#'+cloud).css('padding-right'), 10);
				$('#'+cloud).css('height',$('#'+id).height()+'px').css('line-height',$('#'+id).height()+'px');
				$('#'+cloud).css('min-width',$('#'+id).outerWidth() - padding_left - padding_right +'px');
				$('#'+cloud).css('top',position.top+$('#'+id).height()+offset+'px').css('left', position.left+'px');
			break;
			default:
				$('#'+cloud).css('height',$('#'+id).outerHeight()+'px').css('line-height',$('#'+id).outerHeight()+'px');
				$('#'+cloud).css('top',position.top+'px').css('left', position.left - $('#'+cloud).outerWidth()-offset+'px');
			break;
		}
		if(type == 'checkbox'){
			$('#'+cloud).css('height','30px').css('line-height','30px').css('margin-top','-10px')
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
function validation_check_button(button_object, source){
	var form_object = $(button_object).closest("form");
	
	if($(this).attr('data-form_id')){
		var data_form_id = $(form_object).data('form_id');
	}else{
		var data_form_id = '';
	}
	
	var bad_validation = 0;

	form_object.find(':input').each(function(index, element) {
		if ($(this).is(':visible')){
			if($(this).attr('data-validation')){
				var data = $(this).data('validation');
				data = data.split(',');
				for( i in data){
					data[i] = $.trim(data[i]);
				}
			
				if(data[0] != 'optional'){
					if(!window.validation_check(this.id, 'internal')){
						bad_validation++;
					}
				}
			}		
		}
	});
	if(bad_validation == 0){
		window.next_step(form_object,data_form_id);
	}
	
};

/*
* funkcja check_steps
* funkcja sterująca wyświetlaniem stepów
*/
function next_step(form_object, data_form_id){
	var current_step_object;
	var next_step_object;
	var current_step_number;
	var next_step_number;
	var highest_step = 0;
	var last_step = false;
	
	/*
	* Odczyt aktualnego i następnego stepu
	*/
	form_object.find('.step').each(function(index, element) {
		checked_step = $(this).data('step');
		if(checked_step > highest_step){
			highest_step = checked_step;
		}
	})
	form_object.find('.step').each(function(index, element) {
		if($(this).is(':visible')){
			current_step_object = this;
			current_step_number = parseInt($(this).data('step'));
			next_step_number = current_step_number+1;
		}
    });
	form_object.find('.step').each(function(index, element) {
		if($(this).data('step') == next_step_number){
			next_step_object = this;
		} 
		if(next_step_number == highest_step){
			last_step = true;
		}
		
	})
	
	window.send_form(form_object, data_form_id, last_step);	

	
	$(current_step_object)[step_effect2](step_effect_duration,function(){
		var callback_function_name = 'step'+current_step_number+'_callback'
		
		try {
			window[callback_function_name]();
		} catch(e) {
			console.log(callback_function_name+' - not exist');
		}
		$(next_step_object)[step_effect1](step_effect_duration);
	});	
	
}

/*
* funkcja send
* funkcja sterująca wysyłaniem formularza
*/
function send_form(form_object, data_form_id, last_step){

	/*
	* definiowanie tablic 
	*/
	var value_array  = [];
	var id_array  = [];

	if(table != 'external'){
		form_object.find(':input').each(function(index, element) {

        	data = $(this).data('validation');
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
						value_array.push($(this).prop('checked').toString());
					}else{
						value_array.push($(this).val());
					}
				}
			}
		});
		
		/*
		* zczytywanie dodatkowych danych z _GET i dopisywanie jest do tablicy, która będzie wysłana do bazy danych
		*/
		if(additional_data != undefined && additional_data != '') {
			additional_data_array = additional_data.split(',');
			for(var i in additional_data_array){
				$.trim(additional_data_array[i]);
			};
			for( i in additional_data_array){
				for (j in parametrs){
					parametrs_value_array = parametrs[j].split('=');
					if(additional_data_array[i] == parametrs_value_array[0]){
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
			'http://resources.marketingwizards.pl/validation/1.1.6/FormToDatabase.php',{ 
			 fields: id_array, 
			 values: value_array,
			 table: table,
			 },
			 function(data) { 
				console.log('form was sent');
			 }
		)
		if(confirmation_emails != ''){
			$.post(
				 'http://resources.marketingwizards.pl/validation/1.1.6/confirmation_email/SendConfimation.php',{ 
				 fields: id_array, 
				 values: value_array,
				 confirmation_emails: confirmation_emails,
				 url_source: url_source,
				 title:  document.title,
				 },
				 function(data) {
					  
			 	 }
			 )
		}
		if(last_step == true && custom_email_data.href != ''){
			custom_email_data.email = global_email;
			
			$.ajax({
					type: "POST", 
					url:custom_email_data.href,
					data :custom_email_data,
					success: function(data){ 	
					}
				})
		}
		if(last_step == true && google_conversion.id != ''){
			window.count_conversion(google_conversion.id, google_conversion.label, google_conversion.format, google_conversion.value);
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


function count_conversion(id, label, format){
	document.write = function(text) {
		$('body').append(text);
	};
	window.google_conversion_id = id;
	window.google_conversion_label = label;
	window.google_conversion_format = format;
	window.google_conversion_color = google_conversion.color;
	window.google_conversion_language = google_conversion.language;
	window.google_remarketing_only= google_conversion.remarketing;
	
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




