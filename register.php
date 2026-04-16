<?php
$conn = new mysqli("localhost","root","","local_service");
if($conn->connect_error){ die("Connection Failed"); }

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users(fullname,email,username,password)
VALUES('$fullname','$email','$username','$password')";

if($conn->query($sql) === TRUE){
    echo "<script>alert('✅ Registration Successful'); window.location='index.html';</script>";
} else{
    echo "Error: " . $conn->error;
}

$conn->close();
?>