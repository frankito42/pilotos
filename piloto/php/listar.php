<?php
require "conn.php";


$sql = "SELECT * FROM `ingresos` WHERE fecha=$_GET[fecha] and moneda=$_GET[moneda]";

// Preparar la consulta
$res = $conn->prepare($sql);
$res->execute();
$res=$res->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($res);










?>