<?php
require "conn.php";
$id=$_GET['id'];


$sqlVer = "SELECT * FROM `agenda` WHERE idUser=$_GET[id] and estado='En curso'";

// Preparar la consulta
$verXd = $conn->prepare($sqlVer);

// Asociar los valoverXd a los marcadoverXd de posición

$verXd->execute();

$verXd=$verXd->fetchAll(PDO::FETCH_ASSOC);

if(count($verXd)>=1){

    echo json_encode("ok");
}else{

    $sql = "INSERT INTO `agenda`(`idUser`, `fechaInicio`) VALUES (:id,NOW())";

    // Preparar la consulta
    $res = $conn->prepare($sql);
    
    // Asociar los valores a los marcadores de posición
    $res->bindParam(':id', $id);
    
    
    
    if($res->execute()){
        echo json_encode("ok");
    }else{
        echo json_encode("error");
    
    }

}














?>