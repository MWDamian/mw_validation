<?php
    
    header('Content-type: application/json');
	
   	$value = $_POST['value'];
	$table = 'kody_groupon_as';
	
	$data['test'] = $value;
		
	$con=mysql_connect("sql2.netmark.pl","marketi4_sql","dbkl56@%");
	mysql_select_db("marketi4_misc");
	if (!$con) {
   	  // echo 'Could not connect: ' . mysql_error();
	}else{
	   //echo 'Connected successfully';
	}
	$code_exist = mysql_query("SELECT kod FROM $table WHERE kod = '$value'",$con);
	
	$row_amount = mysql_num_rows($code_exist);
	
	if ($code_exist) {
		if ($row_amount != 0){
			$check_expired = mysql_query("SELECT expired FROM $table WHERE kod = '$value'",$con);
		
			$expired = mysql_fetch_row($check_expired);
			if($expired[0] !== 'expired'){
				
				$data['response'] = "code_ok";
				/*$replace_data_query = mysql_query("UPDATE $table SET expired = 'expired' WHERE kod = '$value'");
				if($replace_data_query){
					
				}*/
				
				
			}else{
				$data['response'] = "code_already_used";	
			}
		}else{
			$data['response'] = "code_doesnt_exist";
		}
	
	}
	
	
	mysql_close($con);
	echo json_encode($data);
?>
