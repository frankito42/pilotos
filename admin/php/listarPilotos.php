<?php
require "../../conn/conn.php";
$sqlPilotos="SELECT * FROM `users` WHERE `admin`!=1";
$pilotos=$conn->prepare($sqlPilotos);
$pilotos->execute();
$pilotos=$pilotos->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($pilotos);




?>