<?php
    
   
   	$fields = json_decode($_POST['fields']);
	$values = json_decode($_POST['values']);
	$table = $_POST['table'];
	
	$fields_array = array();
	$values_array = array();
	foreach($fields as $k=>$val)
	{
		array_push($fields_array, $val);
	}
	foreach($values as $k=>$val)
	{
		array_push($values_array, '"'.$val.'"');
	}
	$length = count($fields_array);
	$con=mysqli_connect("localhost","wizardsdb","Z4duRa6CXMhPULjs","wizards_marketing_services");
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	else
	{
		echo "Connected to MySQL \n\n";
	}
	$check = mysqli_query($con ,"SELECT id FROM ".$table." WHERE id = 1");
	echo "Select returned %d rows. ", mysqli_num_rows($check);
	if ($check !== false) {
		echo "\n table '".$table."' already exist \n\n";
	}else{
		$create_table =
		"CREATE TABLE IF NOT EXISTS ".$table."
		(
			id INT NOT NULL AUTO_INCREMENT,
			date VARCHAR(50) NOT NULL,
			PRIMARY KEY(id)
		)";
		$create_tbl = $con->query($create_table);
		echo "table '".$table."' are created \n";
	};
	
	
	for($i=0;  $i < $length; $i++){
		$check = mysqli_query($con, "SELECT ".$fields_array[$i]." FROM ".$table."");
		if($check !== false){
			echo " column ".$fields_array[$i]." already exists \n ";
		}else{
			$create_col = " ALTER TABLE ".$table." ADD COLUMN ".$fields_array[$i]." VARCHAR(100) NOT NULL";
			$create_cl = $con->query($create_col);
			echo "column '".$fields_array[$i]."' are created \n ";
		}
	}
	for($i=0;  $i < $length; $i++){
		$fields_array_imploded = implode(",", $fields_array);
		$values_array_imploded = implode(",", $values_array);
	}	
	$insert_data = mysqli_query($con,"INSERT INTO ".$table." (date,".$fields_array_imploded.") VALUES (NOW(),".$values_array_imploded.")");
	$insert_dta = $con->query($insert_data);
	echo "\n record ('NOW(),".$values_array_imploded."') \n are inserted to column \n (date,".$fields_array_imploded.") \n ";
	
	
	mysqli_close($con);
?>
