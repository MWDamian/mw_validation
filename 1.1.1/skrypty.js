$(document).ready(function(){
	var visible = 'examples'
 	$('#swap_section_button, #swap_section_button_1').click(function(){
	 	if(visible == 'examples'){
			$("#examples").fadeOut("fast", 0 , function(){
				$("#list").fadeIn("fast");
				visible = 'list';
				$('#swap_section_button span').text('do przykładów walidacji');
			 });
		 }else{
			 $("#list").fadeOut("fast", 0 , function(){
				$("#examples").fadeIn("fast");
				visible = 'examples';
				$('#swap_section_button span').text('do listy funkcji walidacji');
			 });
		 }
	 });
	 
	 $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
});
