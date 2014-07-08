<?php
	header('Content-type: application/json');
	//header('Content-type: text/html');
	
	//$table = $_POST['table'];
	$table = 'zdrowylizak_test';
	$data = array();
	$con=mysql_connect("sql2.netmark.pl","marketi4_sql","dbkl56@%");
	mysql_select_db("marketi4_sql");
	if (!$con) {
		//echo 'Could not connect: ' . mysql_error();
	}else{
		//echo 'Connected successfully';
	}
	$result = mysql_query("SELECT MAX(order_id) FROM $table");
	$row = mysql_fetch_array($result, MYSQL_NUM);
 	$data['order_id'] = $row[0]+1;
		
	mysql_close($con);
	echo json_encode($data);
	
?>

