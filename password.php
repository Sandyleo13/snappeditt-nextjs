<?php

$password = "root123";
$md5Hash = md5($password);

echo "Password: " . $password . "<br>";
echo "MD5 Hash: " . $md5Hash;

?>