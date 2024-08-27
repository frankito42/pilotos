<?php
require "conn.php";
$monto=$_POST['monto'];


$sql = "INSERT INTO `ingresos`(`monto`, `fecha`,tipo,metodo,detalle,moneda,userId) VALUES (:m,NOW(),:tipo,:metodo,:detalle,:moneda,:userId)";

// Preparar la consulta
$res = $conn->prepare($sql);

// Asociar los valores a los marcadores de posición
$res->bindParam(':m', $monto);
$res->bindParam(':tipo', $_POST['tipoIngreso']);
$res->bindParam(':metodo', $_POST['metodoPago']);
$res->bindParam(':detalle', $_POST['detalle']);
$res->bindParam(':moneda', $_POST['moneda']);
$res->bindParam(':userId', $_GET['id']);


if($res->execute()){
    echo json_encode("ok");
}else{
    echo json_encode("error");

}









?>