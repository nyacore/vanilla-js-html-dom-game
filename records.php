<?php
	$db = mysqli_connect('localhost', 'root', 'novata1998', 'game');

	$nickname = $_POST['nickname'];
	$score = $_POST['score'];
	$time = $_POST['time'];

	$sql_query = "INSERT INTO records (nickname, score, time) VALUES 
	(
		'{$nickname}',
		'{$score}',
		'{$time}'
	)";

	mysqli_query($db, $sql_query);

	$sql_query = "SELECT * FROM records";
	$result = mysqli_query($db, $sql_query);

	// God forgives me
	$response = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$response[] = $row;
	}

	echo json_encode($response);
?>