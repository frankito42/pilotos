<?php
require "../../conn/conn.php";
$sqlUsers="SELECT * FROM `users` where admin=0";
$users=$conn->prepare($sqlUsers);
$users->execute();
$users=$users->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($users);
?>