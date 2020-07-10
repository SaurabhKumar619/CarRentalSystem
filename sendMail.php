<?php
	$address = $_POST['emailAddress'];
	$subject = "Confirmation Mail";
	$message = $_POST['message'];

	mail($address, $subject, $message);
	echo "Congratulations!! The Confirmation mail has been sent to your emailId ".$address;

?> 
