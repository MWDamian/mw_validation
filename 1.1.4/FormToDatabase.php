<?php
    
   
   	$fields = $_POST['fields'];
	$values = $_POST['values'];
	$table = $_POST['table'];

	
	$fields_array = array();
	$values_array = array();
		foreach($fields as $k=>$val)
		{
			array_push($fields_array, $val);
			if($fields_array[$k] == 'token'){
				$token = "'".$values[$k]."'";
			}
		}
	
		foreach($values as $k=>$val)
		{
			array_push($values_array, "'".$val."'");
		}
	
	$length = count($fields);
	$con=mysql_connect("sql2.netmark.pl","marketi4_sql","dbkl56@%");
	mysql_select_db("marketi4_sql");
	mysql_query("SET NAMES 'utf8'");
	if (!$con) {
   	   echo 'Could not connect: ' . mysql_error();
	}else{
		echo 'Connected successfully';
	}
	$check = mysql_query("SELECT id FROM ".$table." WHERE id = 1");
	
	if ( $check ) {
		echo "\n table '".$table."' already exist \n\n";
		echo "Select returned %d rows. ", mysql_num_rows($check);
	}else{
		$create_table_query =
		"CREATE TABLE ".$table."
		(
			id INT NOT NULL AUTO_INCREMENT,
			date VARCHAR(50) NOT NULL COMMENT 'data utworzenia',
			ads_agree INT(1) NOT NULL COMMENT 'zgoda na reklamy' ,
			PRIMARY KEY(id)
		)";
		$create_table = mysql_query($create_table_query,$con);
		if($create_table){
			echo "table '".$table."' are created \n";
		}else{
			echo "table '".$table."' are not created ".mysql_error()."\n";
		}
		
	};
	echo '<br/>';
	
	for($i=0;  $i < $length; $i++){
		$check = mysql_query("SELECT ".$fields_array[$i]." FROM ".$table."",$con);
		if($check){
			echo " column ".$fields_array[$i]." already exists ".mysql_error()."\n ";
		}else{
			$create_col_query = " ALTER TABLE ".$table." ADD COLUMN ".$fields_array[$i]." VARCHAR(100) NOT NULL";
			if(mysql_query($create_col_query,$con)){
				echo "column '".$fields_array[$i]."' are created \n ";
			}else{
				echo "columns cannot be created ".mysql_error()."\n ";
			}
		}
	}
	echo '<br/>';
	
	$check_token_exist = mysql_query("SELECT token from ".$table." WHERE token = ".$token."");
	if(!$check_token_exist){
		echo "cannot check if token exist ".mysql_error()."\n ";
	}
	if (mysql_num_rows($check_token_exist) > 0) {
		for($i=0;  $i < $length; $i++){
			if($i != 0){
				$update_imploded_array .=", ";
			}
			$update_imploded_array .= $fields_array[$i]." = ".$values_array[$i];
		}
		
		echo "(UPDATE $table SET $update_imploded_array WHERE token = $token)";
		
		$replace_data_query = mysql_query("UPDATE $table SET $update_imploded_array WHERE token = $token");
		if($replace_data_query){
			echo "\n record ('UPDATE '".$table."' SET '".$update_imploded_array."' WHERE token = '".$token."'') \n ";
		}else{
			echo "record cannot be replaced ".mysql_error()."\n";
		}
		
	}else{
		for($i=0;  $i < $length; $i++){
			$fields_array_imploded = implode(",", $fields_array);
			$values_array_imploded = implode(",", $values_array);
		}
		//echo "fields ".$fields_array_imploded;
		//echo '<br/>';	
		//echo "values ".$values_array_imploded;
		
		$insert_data_query = mysql_query("INSERT INTO $table (date, ads_agree, $fields_array_imploded) VALUES (NOW(), 1, $values_array_imploded)");
		if($insert_data_query){
			echo "\n record ('NOW(), ads_agree,".$values_array_imploded."') \n are inserted to column \n (date, 1,".$fields_array_imploded.") \n ";
		}else{
			echo "record cannot be added ".mysql_error()."\n";
		}
		
	}

	mysql_close($con);
?>
