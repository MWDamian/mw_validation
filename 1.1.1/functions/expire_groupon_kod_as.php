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
	
	
	
	$replace_data_query = mysql_query("UPDATE $table SET expired = 'expired' WHERE kod = '$value'");
	$data['response'] = "code_expired";
	
	mysql_close($con);
	echo json_encode($data);
?>
