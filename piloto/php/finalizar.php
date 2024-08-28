<?php
require "conn.php";


$sql = "UPDATE `agenda` SET `fechaFin`=NOW(),`estado`='Finalizado' WHERE `id`=$_GET[id]";

// Preparar la consulta
$res = $conn->prepare($sql);
$res->execute();



echo json_encode("ok");










?>