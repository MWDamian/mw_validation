<?php
	header('Content-type: application/json');
	

    require '../php/phpmailer/PHPMailerAutoload.php';
   
    $fields = $_POST['fields'];
	$values = $_POST['values'];
	$confirmation_emails = $_POST['confirmation_emails'];
	$title = $_POST['title'];
	$url_source = $_POST['url_source'];
	$SUBJECT = 'Nowe zgłoszenie ze strony: '.$url_source;
	
	$confirmation_emails_array = array();
	
	if (strpos($confirmation_emails,',') !== false) {
    	$confirmation_emails_array = explode(",", $confirmation_emails);
	}else{
		array_push($confirmation_emails_array, $confirmation_emails);
	}
	
	var_dump($confirmation_emails_array);
	$BODY = '
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		</head>
		<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
		<center>
			<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:0; width: 100%; background: #FFFFFF" marginwidth="0" marginheight="0">
				<tr>
					<td align="center">
						<table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:0; margin-left:0; width:600px; background: #888888 url(http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/bg.jpg) repeat-y;" marginwidth="0" marginheight="0">
							<tr>
								<td align="center" valign="middle" width="600" height="20">
									<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
								 </td> 
							</tr>
							<tr>
								<td align="center" valign="middle" width="600" height="84">
									<a href="http://marketingwizards.pl" target="_blank" style="text-decoration:none;">
										<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/mw_logo.png" width="98" height="84" alt="" style="vertical-align:top; display:block; border:none;">
									</a>
								 </td> 
							</tr>
							<tr>
								<td align="center" valign="middle" width="600" height="20">
									<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
								 </td> 
							</tr>
							<tr>
								<td align="center" valign="middle" width="600" style="color:#3b3c36; text-align:center; font-size:24px; font-family:arial, sans-serif;">
									Nowe zgłoszenie ze strony:<br/>
									<a href="'.$url_source.'" target="_blank" style="text-decoration:none; color:inherit;">
										'.$url_source.'
									</a>                            
								 </td> 
							</tr>
							<tr>
								<td align="center" valign="middle" width="600" height="20">
									<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
								 </td> 
							</tr>
							<tr>
								<td align="center" valign="middle" width="600" style="color:#3b3c36; text-align:center; font-size:24px; font-family:arial, sans-serif;">
								   <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:0; margin-left:0; width:600px;" marginwidth="0" marginheight="0">
	';

	$i = 0;
	foreach($fields as $field){
		if($fields[$i] != 'token'){
			$BODY.= '
				<tr>
					<td align="center" valign="middle" width="600" style="color:#3b3c36; text-align:center; font-size:24px; font-family:arial, sans-serif;">
					   <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:0; margin-left:0; width:600px;" marginwidth="0" marginheight="0">
						<tr>
							<td align="left" valign="middle" width="50">
								<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="50" height="1" alt="" style="vertical-align:top;  display:block; border:none;">
							</td>
							<td align="right" valign="middle" width="120" style="padding-right:20px; line-height:40px; font-weight:bold; font-family:arial, sans-serif; color:#3b3c36; font-size:16px;">
								'.$fields[$i].'
							</td>
							<td align="left" valign="middle" width="340" style="padding:0 10px; line-height:40px; border:2px solid #444444; background:#ffffff; font-size:16px;">
								'.$values[$i].'
							</td>
							<td align="right" valign="middle" width="50">
								<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="50" height="1" alt="" style="vertical-align:top; display:block; border:none;">
							</td>
						</tr>
						<tr>
							<td colspan="4" align="center" valign="middle" width="600" height="20">
								<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
							</td> 
						</tr>
					   </table>                      
					 </td> 
				</tr>
			';
		}
		$i++;
	}
		
	 
	 $BODY.= '
								<tr>
									<td align="center" valign="middle" width="600" height="20">
										<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
									 </td> 
								</tr>
								<tr>
									<td align="center" valign="middle" width="600" style="color:#3b3c36; text-align:center; font-size:12px; font-family:arial, sans-serif;">
										Ta wiadomość została wygenerowana automatycznie, nie odpowiadaj na nią.                         
									 </td> 
								</tr>
								<tr>
									<td align="center" valign="middle" width="600" height="20">
										<img src="http://resources.marketingwizards.pl/validation/1.1.4/confirmation_email/images/spacer.gif" width="600" height="20" alt="" style="vertical-align:top; display:block; border:none;">
									 </td> 
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</center>
			</body>
		</html>
	 ';     
	 
	 
	 /**** DEFAULT TWOJEZAPISY ****/
	
	$mail = new PHPMailer(); // create a new object
	$mail->CharSet = "UTF-8";
	$mail->IsSMTP(); // enable SMTP
	//$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true; // authentication enabled
	//$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for GMail
	$mail->Host = "twojezapisy.pl";
	$mail->Port = 587; // or 587
	$mail->IsHTML(true);
	$mail->Username = "no-reply@twojezapisy.pl";
	$mail->Password = "norep01!@";
	$mail->SetFrom("no-reply@twojezapisy.pl", $FROM);
	$mail->Subject = $SUBJECT;
	$mail->Body =$BODY;
	foreach($confirmation_emails_array as $adress){
		$mail->AddAddress($adress);
	}
	$mail->Send();
	 /*if(!$mail->Send())
		{
		echo "Mailer Error: " . $mail->ErrorInfo;
		}
		else
		{
		echo "Email has been sent";
	}*/
	  
	 $data['response'] = "success";
	 echo json_encode($data);
?>
