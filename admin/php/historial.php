<?php
require "../../conn/conn.php";
$sqlPilotos="SELECT u.dni,a.id,u.nombreCompleto,a.`fechaInicio`,a.fechaFin, a.`estado` FROM `agenda` as a 
JOIN users as u on u.id=a.idUser order by estado asc";
$pilotos=$conn->prepare($sqlPilotos);
$pilotos->execute();
$pilotos=$pilotos->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($pilotos);




?>