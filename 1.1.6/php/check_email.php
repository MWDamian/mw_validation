<?php

	header('Content-type: application/json; charset=utf-8');
	require_once 'db_access.php';
	global $dbhost, $dbname, $dblogin, $dbpassword;

	$table = $_POST['table']; 
	
	$dbh = new PDO('mysql:host='.$dbhost.';dbname='.$dbname .'', $dblogin, $dbpassword);
	$dbh->exec("set names utf8");
	
	$sql = 'SELECT * FROM '.$table.' WHERE email = "'.$_POST['email'].'"';
	$query = $dbh->prepare($sql);
	$query->execute();
	$email_exist= $query->fetchAll(PDO::FETCH_ASSOC);
	

	
	if(count($email_exist) > 0){
		$return_data['email_unique'] = false;
		$return_data['email_count'] = count($email_exist);
	}else{
		$return_data['email_unique'] = true;
		$return_data['email_count'] = count($email_exist);
	}

	$query->closeCursor();
	echo json_encode($return_data);
?>

