<?php
require "conn.php";


$sql = "SELECT u.nombreCompleto,a.`fechaInicio`,a.fechaFin, a.`estado` FROM `agenda` as a 
JOIN users as u on u.id=a.idUser WHERE u.id=$_GET[id] and a.estado='Finalizado' limit 20";

// Preparar la consulta
$res = $conn->prepare($sql);
$res->execute();
$res=$res->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($res);










?>