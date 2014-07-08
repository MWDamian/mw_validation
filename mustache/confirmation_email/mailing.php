<?php
    require 'phpmailer/PHPMailerAutoload.php';

	$user_email = $_POST['damian@marketingwizards.pl'];
	$FROM = "";
    $SUBJECT = "Twoja zniżka 10%";
	//$BODY = file_get_contents('email/email.html');

	$BODY = '
	<center>
			<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" 
            style="margin-top:0; margin-right:0; margin-bottom:0; margin-left:0; background-color: #FFFFFF; width: 100%; background: #FFFFFF" marginwidth="0" marginheight="0">
				<tr>
					<td align="center">
						<table width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" 
						style="margin-top:0; margin-right:0; margin-bottom:0; margin-left:0; background-color: #FFFFFF; width:600px; height:400px; background: #FFFFFF" marginwidth="0" marginheight="0">
							<tr>
								<td width="300" height="200" style="width:300px; height:200px">
									<a href="http://kebabking.biz//" target="_blank" style="text-decoration:none;">
										<img src="http://dostawa.kebabking.biz/mailing/email/images/image_01.jpg" width="300" height="200" 
										alt="Kebab King - 10% zniżki na najlepszy kebab w mieście" style="vertical-align:top; display:block; border:none;">
									</a>
								</td>
								<td width="300" height="200" style="width:300px; height:200px">
									<a href="http://kebabking.biz//" target="_blank" style="text-decoration:none;">
										<img src="http://dostawa.kebabking.biz/mailing/email/images/image_02.jpg" width="300" height="200" 
										alt="Sprawdź" style="vertical-align:top; display:block; border:none;">
									</a>
								</td>
							</tr>
							<tr>
								<td width="300" height="200" style="width:300px; height:200px">
									<a href="http://kebabking.biz//" target="_blank" style="text-decoration:none;">
										<img src="http://dostawa.kebabking.biz/mailing/email/images/image_03.jpg" width="300" height="200" 
											alt="Kebab King - 10% zniżki na najlepszy kebab w mieście" style="vertical-align:top; display:block; border:none;">
									</a>
								</td>
								<td width="300" height="200" style="width:300px; height:200px">
									<a href="http://kebabking.biz//" target="_blank" style="text-decoration:none;">
										<img src="http://dostawa.kebabking.biz/mailing/email/images/image_04.jpg" width="300" height="200" 
										alt="Sprawdź" style="vertical-align:top; display:block; border:none;">
									</a>
								</td>
							</tr>
						</table>
						
						<table width="600" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" 
						style="margin-top:0; margin-right:0; margin-bottom:0; margin-left:0; background-color: #FFFFFF; width:600px; background: #FFFFFF" marginwidth="0" marginheight="0">
							<tr>
								<td width="600" style="width:600px; font-family:Arial, sans-serif; font-size:10px; text-decoration:none; color:#444444; text-align:center;" >
									Wiadomość wysłana przez Roxana Sp. z o.o. z siedzibą w Warszawie, przy ul. Aleje Jerozolimskie 42, 00-024 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS 0000231452, NIP: 525-2458-09-75.
									<br/>
									<a href="http://resources.marketingwizards.pl/unsubscribe/unsubscribe.php?client=kebabking&email='.$user_email.'" target="_blank" style="text-decoration:underline; color:#114888;:">
										Zrezygnuj z otrzymywania wiadomości
									</a>
								</td>
							</tr>
						</table>
						
					</td>
				</tr>
			</table>
		</center>	
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
	$mail->AddAddress($user_email);
	$mail->Send();
	 /*if(!$mail->Send())
		{
		echo "Mailer Error: " . $mail->ErrorInfo;
		}
		else
		{
		echo "Email has been sent";
	}*/
    
?>
