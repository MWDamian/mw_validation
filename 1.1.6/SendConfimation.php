<?php
	header('Content-type: application/json');

    require_once('SMTP.class.php');
    require_once('PHPMailer.class.php');
   
    $fields = $_POST['fields'];
	$values = $_POST['values'];
	$confirmation_emails = $_POST['confirmation_emails'];
	$title = $_POST['title'];
	$confirmation_emails_array = array();
	
	if (strpos($confirmation_emails,',') !== false) {
    	$confirmation_emails_array = explode(",", $confirmation_emails);
	}else{
		
		array_push($confirmation_emails_array, $confirmation_emails);
	}
		
    $length_emails = count($confirmation_emails_array);
   	$length = count($fields);

	 $obj = new PHPMailer();
     $obj->FromName = $title;
     $obj->Subject = "Nowe zgłoszenie";
	 for($i=0;  $i < $length_emails; $i++){
		echo $confirmation_emails_array[$i];
     	$obj->AddAddress($confirmation_emails_array[$i]);
	 }
	 //$obj->AddCC("damian@marketingwizards.pl");
	 for($i=0;  $i < $length; $i++){
		$body .=  " <strong>".$fields[$i]." : </strong><span>".$values[$i]."</span><br/> ";
	 }
     $tresc = "
	  	<table>
			<tr>
				<td>
				".$body."					
				<td>
			</tr>
		</table>					
     ";
     $obj->Body = $tresc;
     
     return $obj->Send();
	  
	 $data['response'] = "success";
	 echo json_encode($data);
?>
