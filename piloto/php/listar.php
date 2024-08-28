<?php
require "conn.php";


$sql = "SELECT a.id,u.nombreCompleto,a.`fechaInicio`, a.`estado` FROM `agenda` as a 
JOIN users as u on u.id=a.idUser WHERE u.id=$_GET[id] and a.estado='En curso'";

// Preparar la consulta
$res = $conn->prepare($sql);
$res->execute();
$res=$res->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($res);










?>